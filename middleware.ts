import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 🔥 static files NEVER block
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('sb-access-token')

  // public route
  if (!token && pathname !== '/login' && pathname !== '/auth/callback') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
