import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/services/auth';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout: authLogout } = useAuth();

  const handleLoggedOut = () => {
    authLogout();
    queryClient.clear();
    window.location.href = '/';
  };

  return useMutation({
    mutationFn: logout,
    // 로그아웃 API 성공/실패 여부와 관계없이 클라이언트 상태는 항상 초기화
    onSettled: handleLoggedOut,
  });
};
