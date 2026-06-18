import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  const text = await response.text();

  const data = JSON.parse(text);
  const nextResponse = NextResponse.json(data, { status: response.status });

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) nextResponse.headers.set('set-cookie', setCookie);

  return nextResponse;
}
