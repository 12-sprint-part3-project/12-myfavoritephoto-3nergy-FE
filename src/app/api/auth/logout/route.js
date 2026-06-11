// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const cookieHeader = request.headers.get('cookie');

  const response = await fetch(`${process.env.API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
  });

  const data = await response.json();
  const nextResponse = NextResponse.json(data);

  // 로그아웃 시 쿠키 만료 처리
  nextResponse.cookies.set('refreshToken', '', { maxAge: 0 });

  return nextResponse;
}
