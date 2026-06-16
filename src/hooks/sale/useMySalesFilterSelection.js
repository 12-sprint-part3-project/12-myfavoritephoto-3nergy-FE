import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMySales } from '@/services/sales';
import { useFilterSelection } from '@/hooks/common/useFilterSelection';

export const useMySalesFilterSelection = (data) => {
  return useFilterSelection(
    data?.data,
    ['grade', 'genre', 'method', 'soldOut'], // 기존 키 사용
    {
      totalCountQueryKey: (params) => QUERY_KEYS.mySales.list(params),
      totalCountQueryFn: (params) => getMySales(params),
      mapToApiParams: (selection) => ({
        grade: selection.grade ?? '',
        genre: selection.genre ?? '',
        saleMethod: selection.method ?? '', // method → saleMethod 변환
        isSoldOut:
          selection.soldOut === 'SOLD_OUT'
            ? true
            : selection.soldOut === 'SALE'
              ? false
              : '',
      }),
      countKeyMap: {
        saleStatusCounts: 'soldOut', // soldOut 탭 키에 맞춤
        saleMethodCounts: 'method', // method 탭 키에 맞춤
      },
      totalCount: data?.meta?.totalCount,
    },
  );
};
