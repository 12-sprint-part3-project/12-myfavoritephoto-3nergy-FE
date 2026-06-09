import { QueryClient } from '@tanstack/react-query';
import { getErrorHandler } from '@/constants/errorHandler';
import { clearToken } from '@/utils/token';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onError: (error) => {
        const { action, message } = getErrorHandler(error?.code);

        // error의 action에 따라 분기 처리
        if (action === 'session-expired') {
          // 토큰 정리 후 AuthProvider에 세션 만료 알림
          clearToken();
          window.dispatchEvent(
            new CustomEvent('auth:error', {
              detail: { type: 'session-expired' },
            }),
          );
          return;
        }

        if (action === 'login-required') {
          // AuthProvider에 로그인 필요 알림
          window.dispatchEvent(
            new CustomEvent('auth:error', {
              detail: { type: 'login-required' },
            }),
          );
          return;
        }

        if (action === 'toast') {
          // TODO: 커스텀 토스트 훅 연동 예정
          console.error(message ?? error?.message);
        }
      },
    },
  },
});
