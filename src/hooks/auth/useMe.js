import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { MINUTE } from '@/constants/time';
import { getMe } from '@/services/user';

export const useMe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: getMe,
    staleTime: MINUTE * 30,
    gcTime: MINUTE * 5,
    select: (data) => data.user,
  });
};
