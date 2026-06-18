import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signup } from '@/services/auth';

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body) => signup(body),
    onSuccess: () => {
      router.push('/login');
    },
  });
};
