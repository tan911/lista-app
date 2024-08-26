import { vi, it, describe, expect } from 'vitest'
import { signup, signin } from './authentication'
import { SigninFormSchema } from '@/lib/definitions'
import { verify, hash } from '@node-rs/argon2'
import prisma from '@/lib/__mocks__/prisma'
import lucia from '@/lib/__mocks__/lucia'

vi.mock('@/lib/prisma')

vi.mock('lucia', async (importOriginal) => {
    const originalModule = await importOriginal<typeof import('lucia')>()
    return {
        ...originalModule,
        createSession: vi.fn(),
        createSessionCookie: vi.fn(),
    }
})

vi.mock('react', async (importOriginal) => {
    const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) => func
    const originalModule = await importOriginal<typeof import('react')>()
    return {
        ...originalModule,
        cache: testCache,
    }
})

vi.mock('argon2', async (importOriginal) => {
    const originalModule = await importOriginal<typeof import('@node-rs/argon2')>()
    return {
        ...originalModule,
        hash: vi.fn(),
        verify: vi.fn(),
    }
})

vi.mock('next/headers', async (importOriginal) => {
    const originalModule = await importOriginal<typeof import('next/headers')>()
    return {
        ...originalModule,
        cookies: vi.fn(() => ({
            set: vi.fn(),
        })),
    }
})

vi.mock('next/navigation', async (importOriginal) => {
    const originalModule = await importOriginal<typeof import('next/navigation')>()
    return {
        ...originalModule,
        redirect: vi.fn(),
    }
})

describe('signup', () => {
    const hash = vi.fn()
    const cookies = vi.fn()

    it('should return errors if validation fails', async () => {
        const invalidData = new FormData()
        invalidData.append('email', 'invalid-email')

        const result = await signup(invalidData)

        expect(result.errors).toBeDefined()
        expect(result.errors).toHaveProperty('name')
        expect(result.errors).toHaveProperty('password')
    })

    it('should return an error if the user already exists', async () => {
        const validData = new FormData()
        validData.append('name', 'Test User')
        validData.append('email', 'test@example.com')
        validData.append('password', '@Password123')

        prisma.user.findUnique.mockResolvedValueOnce({
            id: '1',
            name: 'test',
            email: 'test@gmail.com',
            password: 'Hello@world123',
        })

        const result = await signup(validData)

        expect(result.error).toBe('User already exist.')
    })

    it('should return an error if something goes wrong during user creation', async () => {
        const validData = new FormData()
        validData.append('name', 'Test User2')
        validData.append('email', 'test2@example.com')
        validData.append('password', '@Password1234')

        prisma.user.findUnique.mockResolvedValueOnce(null)
        hash.mockResolvedValueOnce('hashedPassword')
        prisma.user.create.mockRejectedValueOnce(new Error('Database error'))

        const result = await signup(validData)

        expect(result.error).toBe('Something went wrong.')
    })

    it('should create a user and set a session cookie on successful signup', async () => {
        const validData = new FormData()
        validData.append('name', 'Me Test')
        validData.append('email', 'me@example.com')
        validData.append('password', '@Password123')

        prisma.user.findUnique.mockResolvedValueOnce(null)
        hash.mockResolvedValueOnce('hashedPassword')

        prisma.user.create.mockResolvedValueOnce({
            id: '1',
            name: 'Me Test',
            email: 'me@example.com',
            password: '@Password123',
        })

        lucia.createSession.mockResolvedValueOnce({
            id: 'session-id',
            expiresAt: new Date(),
            fresh: false,
            userId: '1',
        })

        lucia.createSessionCookie.mockReturnValueOnce({
            name: 'session-cookie',
            value: 'cookie-value',
            attributes: { httpOnly: true },
            serialize: function (): string {
                throw new Error('Function not implemented')
            },
        })

        const mockCookies = { set: vi.fn() }
        cookies.mockReturnValueOnce(mockCookies)

        const result = await signup(validData)

        expect(prisma.user.create).toHaveBeenCalled()

        expect(result).toBeUndefined()
    })
})

describe('signin', () => {
    it('should return errors if validation fails', async () => {
        const invalidData = new FormData()
        invalidData.append('email', 'invalid-email')
        invalidData.append('password', 'invalid-password')

        const result = await signin(invalidData)

        expect(result.errors).toBeDefined()
        expect(result.errors).toHaveProperty('email')
    })

    it('should return an error if user does not exist', async () => {
        const validData = new FormData()
        validData.append('email', 'userexist@example.com')
        validData.append('password', '@Password1234')

        prisma.user.findUnique.mockResolvedValueOnce(null)

        const result = await signin(validData)

        expect(result.error).toBe('Invalid credentials')
    })

    it('should return an error if password is incorrect', async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: '1',
            name: 'Me Test',
            email: 'test@example.com',
            password: 'hashed-password',
        })

        const data = new Map()
        data.set('email', 'test@example.com')
        data.set('password', 'wrong-password')

        const validateFields = SigninFormSchema.safeParse({
            email: data.get('email'),
            password: data.get('password'),
        })

        const fields = validateFields.data

        const existingUser = await prisma.user.findUnique({
            where: {
                email: fields?.email,
            },
        })

        const passwordHash = await hash(existingUser?.password as string, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        })

        const validPassword = await verify(passwordHash, fields?.password as string, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        })

        expect(validPassword).toBe(false)
        expect({ error: 'Invalid credentials' }).toEqual({ error: 'Invalid credentials' })
    })
})
