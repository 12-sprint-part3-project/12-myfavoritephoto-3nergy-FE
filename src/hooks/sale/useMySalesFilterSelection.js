import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMySales } from '@/services/sales';
import { useFilterSelection } from '@/hooks/common/useFilterSelection';

export const useMySalesFilterSelection = (data) => {
  return useFilterSelection(
    data?.data,
    ['grade', 'genre', 'method', 'soldOut'],
    {
      totalCountQueryKey: (params) => QUERY_KEYS.mySales.list(params),
      totalCountQueryFn: (params) => getMySales(params),
      mapToApiParams: (selection) => ({
        grade: selection.grade ?? '',
        genre: selection.genre ?? '',
        saleMethod: selection.method ?? '',
        isSoldOut:
          selection.soldOut === 'SOLD_OUT'
            ? true
            : selection.soldOut === 'SALE'
              ? false
              : '',
      }),
      countKeyMap: {
        saleStatusCounts: 'soldOut',
        saleMethodCounts: 'method',
      },
      totalCount: data?.meta?.totalCount,
    },
  );
};
