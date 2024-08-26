import { validateAuthSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = await validateAuthSession()
    if (!user) {
        return redirect('/auth/signin')
    }
    return <main>{children}</main>
}
