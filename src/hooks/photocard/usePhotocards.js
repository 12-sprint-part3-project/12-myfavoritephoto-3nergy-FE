import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';

export const usePhotocards = (params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.photocards.list(params),
    queryFn: () => getPhotocards(params),
    placeholderData: (previousData) => previousData,
    select: (res) => ({
      photocards: res.data.photocards,
      meta: res.meta,
    }),
  });
};
