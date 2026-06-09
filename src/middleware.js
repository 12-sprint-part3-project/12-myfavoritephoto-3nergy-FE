import { NextResponse } from 'next/server';

// 로그인 필수 페이지 경로
const PROTECTED_PATHS = ['/my-gallery', '/my-sales'];
const AUTH_PATHS = ['/login', '/signup'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 로그인 상태에서 랜딩/로그인/회원가입 접근 시 마켓플레이스로 redirect
  if ([...AUTH_PATHS, '/'].includes(pathname) && refreshToken) {
    return NextResponse.redirect(new URL('/marketplace', request.url));
  }

  // 비로그인 상태에서 로그인 필수 페이지 접근 시 로그인으로 redirect
  if (PROTECTED_PATHS.includes(pathname) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로를 지정: api 요청이나 정적 파일에서는 미들웨어 실행하지 않음
export const config = {
  matcher: ['/((?!api|_next|fonts|icons|favicon.ico).*)'],
};
