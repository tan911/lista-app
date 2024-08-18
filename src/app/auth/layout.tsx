import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Lista',
    description:
        'Lista Streamlines sari-sari store management by digitizing customer credits, and transactions',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="absolute left-10 top-10">
                <Link
                    href="/"
                    className="block p-2 rounded-lg transition-all ease-in hover:bg-neutral-200/50 hover:shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                    <ChevronLeft className="text-neutral-800" size={20} />
                    <span>Home</span>
                </Link>
            </div>
            <main className="w-full h-screen flex items-center justify-center">
                <div className="mx-auto w-full max-w-fit md:max-w-[450px]">{children}</div>
            </main>
        </>
    )
}
