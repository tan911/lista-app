'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { hash, verify } from '@node-rs/argon2'
import { SigninFormSchema, SignupFormSchema } from '@/lib/definitions'
import { lucia } from '@/lib/lucia'
import { validateAuthSession } from '@/lib/session'
import prisma from '@/lib/prisma'

export async function signup(data: FormData | null) {
    const validateFields = SignupFormSchema.safeParse({
        name: data?.get('name'),
        email: data?.get('email'),
        password: data?.get('password'),
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validateFields.data

    // check user to avoid duplicates
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (existingUser) {
        return { error: 'User already exist.' }
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
        })

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    } catch (e) {
        console.log('ERROR: ', e)
        return { error: 'Something went wrong.' }
    }

    return redirect('/dashboard')
}

export async function signin(data: FormData | null) {
    const validateFields = SigninFormSchema.safeParse({
        email: data?.get('email'),
        password: data?.get('password'),
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validateFields.data

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!existingUser) {
        return {
            error: 'Invalid credentials',
        }
    }

    const validPassword = await verify(existingUser.password as string, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })

    if (!validPassword) {
        return { error: 'Invalid credentials' }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/dashboard')
}

export async function signout() {
    const { session } = await validateAuthSession()
    if (!session) {
        return {
            error: 'Unauthorized',
        }
    }
    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/auth/signin')
}
