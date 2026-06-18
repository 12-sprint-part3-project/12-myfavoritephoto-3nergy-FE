import { NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const beResponse = await fetch(
      `${process.env.API_URL}/api/auth/google/callback?code=${code}`,
    );

    if (!beResponse.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const data = await beResponse.json();
    const { accessToken, refreshToken } = data.data ?? {};

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.redirect(
      new URL(`/auth/google/callback?accessToken=${accessToken}`, request.url),
    );

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 604800,
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
