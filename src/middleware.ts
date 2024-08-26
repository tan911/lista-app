import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    // const path = req.nextUrl.pathname
    // const isProtectedRoute = protectedRoutes.includes(path)
    // const isPublicRoute = publicRoutes.includes(path)

    // const cookie = cookies().get('session')?.value
    // const session = cookie?.split(' ')[0]
    console.log('LOG!!! MIDDLEWARE! RUN!')

    // // 5. Redirect to /login if the user is not authenticated
    // if (isProtectedRoute && !session?.userId) {
    //     return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    // }

    // // 6. Redirect to /dashboard if the user is authenticated
    // if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    // }
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
