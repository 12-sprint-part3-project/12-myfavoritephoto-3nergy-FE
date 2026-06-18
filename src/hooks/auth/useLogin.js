import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { login } from '@/services/auth';
import { setToken } from '@/utils/token';

export const useLogin = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  return useMutation({
    mutationFn: (body) => login(body),
    onSuccess: (data) => {
      setToken(data.accessToken);
      authLogin(data.accessToken);
      router.push('/marketplace');
    },
  });
};
