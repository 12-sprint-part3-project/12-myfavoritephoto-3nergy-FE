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
      status: selection.soldOut ?? '', // soldOut → status 변환
    }),
    countKeyMap: {
      saleStatusCounts: 'soldOut', // soldOut 탭 키에 맞춤
    },
    totalCount: data?.meta?.totalCount,
  });
};
