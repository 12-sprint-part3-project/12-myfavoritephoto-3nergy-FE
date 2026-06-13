import { QueryClient, MutationCache } from '@tanstack/react-query';
import { getErrorHandler } from '@/constants/errorHandler';
import { MINUTE } from '@/constants/time';
import { clearToken } from '@/utils/token';
import { showGlobalToast } from '@/lib/toast/toastService';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 실패 시 재시도 안함
      staleTime: MINUTE, // 1분 간 재요청하지 않음
      gcTime: MINUTE * 5, // 5분 후 캐시 삭제
      refetchOnWindowFocus: false, // 탭 다시 포커스 시 재요청하지 않음
    },
  },

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // createSale mutation은 컴포넌트에서 직접 처리
      if (mutation.options.mutationKey?.[0] === 'createSale') {
        return;
      }

      const { action, message } = getErrorHandler(error?.code);

      // error의 action에 따라 분기 처리
      if (action === 'field') {
        return;
      }

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
        showGlobalToast(message ?? error?.message);
      }
    },
  }),
});
