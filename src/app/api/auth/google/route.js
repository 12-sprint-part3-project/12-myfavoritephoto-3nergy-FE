import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  const response = await fetch(`${process.env.API_URL}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const nextResponse = NextResponse.json(data, { status: response.status });

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) nextResponse.headers.set('set-cookie', setCookie);

  return nextResponse;
}
