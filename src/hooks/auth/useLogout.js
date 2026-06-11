import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/services/auth';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: authLogout } = useAuth();

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
