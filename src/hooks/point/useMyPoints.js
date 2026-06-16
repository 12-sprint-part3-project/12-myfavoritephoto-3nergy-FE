import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getMyPoints } from '@/services/point';
import { QUERY_KEYS } from '@/constants/queryKeys';

// 보유 포인트 조회
export const useMyPoints = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: QUERY_KEYS.point.me(),
    queryFn: getMyPoints,
    select: (data) => data.point,
    enabled: Boolean(accessToken),
  });
};
