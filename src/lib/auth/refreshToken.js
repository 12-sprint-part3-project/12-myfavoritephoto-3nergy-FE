import { setToken } from '@/utils/token';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// httpOnly 쿠키의 Refresh Token으로 Access Token 재발급
// 재발급 성공 시 localStorage에 저장
export const refreshAccessToken = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // httpOnly 쿠키 자동 전송
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.error?.message ?? 'Access Token 재발급에 실패했습니다.',
    );
    error.code = data.error?.code;
    error.statusCode = response.status;
    throw error;
  }

  setToken(data.data.accessToken);
  return data.data.accessToken;
};
