import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME    = 'admin_token'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''

function makeToken(password: string): string {
  return btoa(encodeURIComponent(password))
}

function isAuthenticated(req: NextRequest): boolean {
  return req.cookies.get(COOKIE_NAME)?.value === makeToken(ADMIN_PASSWORD)
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── Admin routes ──────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const authenticated = isAuthenticated(req)

    // Already logged in → skip login page
    if (pathname === '/admin/login' && authenticated) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // Not logged in → go to login
    if (pathname !== '/admin/login' && !authenticated) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
