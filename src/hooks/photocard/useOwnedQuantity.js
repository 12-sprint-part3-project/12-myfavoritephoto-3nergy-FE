import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getOwnedQuantity } from '@/services/photocard';

export const useOwnedQuantity = (photocardId) => {
  return useQuery({
    queryKey: QUERY_KEYS.photocards.ownedQuantity(photocardId),
    queryFn: () => getOwnedQuantity(photocardId),
    enabled: !!photocardId,
  });
};
