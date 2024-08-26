'use client'

import Link from 'next/link'
import { z } from 'zod'
import { Archivo } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SigninFormSchema } from '@/lib/definitions'
import { signin } from '@/app/_actions/authentication'
import Submit from '../_components/submit'

const archivo = Archivo({
    weight: ['400', '800', '700', '600', '900'],
    subsets: ['latin'],
    display: 'swap',
})

export default function Page() {
    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    return (
        <>
            <div className="mb-8 px-1.5">
                <h1
                    className={`text-center text-3xl text-neutral-800 tracking-tight font-black sm:text-left ${archivo.className}`}
                >
                    Log in account
                </h1>
                <p className="text-center text-base font-normal sm:text-left">
                    Dont have an account?{' '}
                    <Link
                        className="text-blue-600 underline underline-offset-3 hover:text-blue-800"
                        href="/auth/signup"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
            <div>
                <Form {...form}>
                    <form action={signin}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="rounded-lg p-1.5 focus-within:bg-neutral-200/60">
                                    <FormItem className="border space-y-0 px-3 py-2 rounded-lg bg-white focus-within:border-neutral-800">
                                        <FormLabel htmlFor="email" className="text-neutral-400">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`border-none outline-none text-lg text-neutral-600 p-0 h-6 font-bold placeholder:text-neutral-400/70 focus-visible:ring-none focus-visible:ring-0 ${archivo.className}`}
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="rounded-lg p-1.5 focus-within:bg-neutral-200/60">
                                    <FormItem className="border space-y-0 px-3 py-2 rounded-lg bg-white focus-within:border-neutral-800">
                                        <FormLabel htmlFor="password" className="text-neutral-400">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`border-none outline-none text-lg text-neutral-600 p-0 h-6 font-bold placeholder:text-neutral-400/70 focus-visible:ring-none focus-visible:ring-0 ${archivo.className}`}
                                                id="password"
                                                type="password"
                                                placeholder="••••••••••••"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </FormItem>
                            )}
                        />
                        <FormItem className="mt-2 rounded-lg p-1.5 focus-within:bg-neutral-200/80 md:mt-5">
                            <Submit message="continue" classname={archivo.className} />
                        </FormItem>
                    </form>
                </Form>
            </div>
        </>
    )
}
