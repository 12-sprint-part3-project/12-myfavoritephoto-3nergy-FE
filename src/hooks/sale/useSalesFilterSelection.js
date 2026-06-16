import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSales } from '@/services/sales';
import { useFilterSelection } from '@/hooks/common/useFilterSelection';

export const useSalesFilterSelection = (data) => {
  return useFilterSelection(data, ['grade', 'genre', 'soldOut'], {
    totalCountQueryKey: (params) => QUERY_KEYS.sales.list(params),
    totalCountQueryFn: (params) => getSales(params),
    mapToApiParams: (selection) => ({
      grade: selection.grade ?? '',
      genre: selection.genre ?? '',
      status: selection.soldOut ?? '',
    }),
    countKeyMap: {
      saleStatusCounts: 'soldOut',
    },
    totalCount: data?.meta?.totalCount,
  });
};
