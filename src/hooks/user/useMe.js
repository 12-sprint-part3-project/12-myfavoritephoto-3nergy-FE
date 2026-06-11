import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getMe } from '@/services/user';

export const useMe = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(accessToken),
  });
};
