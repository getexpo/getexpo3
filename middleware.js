import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production-min-32-chars-long'
)

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect to admin if already logged in and trying to access login
  if (pathname === '/login') {
    const token = request.cookies.get('admin-token')?.value
    
    if (token) {
      try {
        await jwtVerify(token, secret)
        return NextResponse.redirect(new URL('/admin', request.url))
      } catch (error) {
        // Token invalid, allow access to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}

