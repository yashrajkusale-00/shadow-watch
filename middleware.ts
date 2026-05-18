import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  const { pathname } = request.nextUrl

  // Allow access to login page and public assets
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
  ) {
    // If user is already logged in and tries to access /login, redirect to home
    if (session && pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // If no session is found, redirect to login page
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
