export const fetchPublic = async (endpoint, options = {}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error?.message ?? '오류가 발생했습니다.');
    error.code = data.error?.code;
    error.statusCode = response.status;
    throw error;
  }

  return data.meta ? { data: data.data, meta: data.meta } : data.data;
};
