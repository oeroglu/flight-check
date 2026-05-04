import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  return;
  const { pathname } = req.nextUrl

  // static ignore
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('sb-access-token')

  if (!token && pathname !== '/login' && pathname !== '/auth/callback') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
