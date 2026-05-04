import { NextResponse } from 'next/server'

export function middleware(req) {
  const isLoggedIn = req.cookies.get('sb-access-token')
  if (!isLoggedIn && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}
