import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only handle welcome page redirect
  if (pathname === '/welcome') {
    const hasVisitedBefore = request.cookies.get('hasVisitedBefore')
    
    if (hasVisitedBefore) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/welcome'],
}