import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/services/auth';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: authLogout } = useAuth();

  // 로그아웃 API 성공/실패 여부와 상관없이 클라이언트 인증 상태는 정리
  const handleLoggedOut = () => {
    authLogout();
    queryClient.clear();
    router.push('/');
  };

  return useMutation({
    mutationFn: logout,
    onSuccess: handleLoggedOut,
    onError: handleLoggedOut,
  });
};
