import { fetchClient } from './fetchClient';
import { refreshAccessToken } from '@/lib/auth/refreshToken';
import { getErrorHandler } from '@/constants/errorHandler';

// 동시에 여러 요청이 401 날 때 refresh를 한 번만 실행하기 위한 플래그
let isRefreshing = false;
let refreshPromise = null;

// 인증이 필요한 API 요청 래퍼
// 401(ACCESS_TOKEN_EXPIRED) 발생 시 토큰 재발급 후 자동 재시도
export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    return await fetchClient(endpoint, options);
  } catch (error) {
    const { action } = getErrorHandler(error?.code);

    // refresh 액션이 아니면 그대로 throw
    if (action !== 'refresh') {
      throw error;
    }

    // 동시 요청 시 refresh 중복 방지
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    await refreshPromise;

    // 재발급 후 원래 요청 재시도
    return fetchClient(endpoint, options);
  }
};
