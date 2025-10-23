import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 미들웨어 로직 제거 - 모든 요청을 그대로 통과
  return NextResponse.next()
}

export const config = {
  matcher: [],
}