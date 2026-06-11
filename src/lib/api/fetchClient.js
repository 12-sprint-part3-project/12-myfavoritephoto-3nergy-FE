import { getToken } from '@/utils/token';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 순수 HTTP 클라이언트
// 인증 처리(401, 재발급)는 fetchWithAuth에서 담당
export const fetchClient = async (endpoint, options = {}) => {
  const accessToken = getToken();

  const url = endpoint.startsWith('/api/auth')
    ? endpoint // BASE_URL 없이
    : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // httpOnly 쿠키의 Refresh Token 자동 전송
    headers: {
      'Content-Type': 'application/json',
      // Access Token 있을 때만 Authorization 헤더 추가
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.error?.message ?? '알 수 없는 오류가 발생했습니다.',
    );
    error.code = data.error?.code;
    error.statusCode = response.status;
    throw error;
  }

  // meta 있으면 { data, meta } 반환, 없으면 data 바로 반환
  return data.meta ? { data: data.data, meta: data.meta } : data.data;
};

export default fetchClient;
