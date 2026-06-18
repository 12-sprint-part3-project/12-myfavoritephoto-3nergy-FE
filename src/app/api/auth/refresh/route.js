// app/api/auth/refresh/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const cookieHeader = request.headers.get('cookie');

  const response = await fetch(`${process.env.API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
  });

  const data = await response.json();
  const nextResponse = NextResponse.json(data);

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) nextResponse.headers.set('set-cookie', setCookie);

  return nextResponse;
}
