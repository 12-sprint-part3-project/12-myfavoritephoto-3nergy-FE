import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';
import { useFilterSelection } from '@/hooks/common/useFilterSelection';

export const usePhotocardFilterSelection = (data) => {
  return useFilterSelection(data, ['grade', 'genre'], {
    totalCountQueryKey: (params) => QUERY_KEYS.photocards.list(params),
    totalCountQueryFn: (params) => getPhotocards(params),
  });
};
