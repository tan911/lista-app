import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Lista',
    description:
        'Lista Streamlines sari-sari store management by digitizing customer credits, and transactions',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-screen flex items-center justify-center">
            <div className="mx-auto w-full max-w-fit md:max-w-[450px]">{children}</div>
        </main>
    )
}
