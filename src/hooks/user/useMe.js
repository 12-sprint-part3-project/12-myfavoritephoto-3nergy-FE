import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getMe } from '@/services/user';

// 로그인 상태일 때만 내 정보 조회
export const useMe = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(accessToken),
  });
};
