import Link from 'next/link'
import { Archivo_Black } from 'next/font/google'

const archivoBlack = Archivo_Black({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export default function Home() {
    return (
        <main className="w-full h-screen flex items-center justify-center">
            <div className="mx-auto w-full max-w-fit md:max-w-[500px]">
                <h3
                    className={`text-center text-5xl font-extrabold tracking-tight ${archivoBlack.className}`}
                >
                    Lista
                </h3>
                <p className="mt-2 leading-snug text-center">
                    Say goodbye to paper records. Simplify your daily operations and manage customer
                    credits effortlessly. Lista is designed to help you run your store more
                    efficiently and provide better service to your customers.
                </p>
                <div className="mt-12 text-center">
                    <Link
                        href="/auth/signin"
                        className="py-2 px-4 text-white mr-4 rounded-lg bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="py-2 px-4 border rounded-lg hover:bg-neutral-200/50"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </main>
    )
}
