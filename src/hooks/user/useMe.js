import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getMe } from '@/services/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { MINUTE } from '@/constants/time';

export const useMe = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: QUERY_KEYS.me(),
    queryFn: getMe,
    select: (data) => data.user,
    enabled: Boolean(accessToken),
    // 닉네임은 자주 변하지 않는 데이터이므로 캐시를 길게 유지
    staleTime: 5 * MINUTE,
    gcTime: 10 * MINUTE,
  });
};
