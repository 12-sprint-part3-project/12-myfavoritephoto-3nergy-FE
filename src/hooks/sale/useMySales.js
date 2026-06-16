import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMySales } from '@/services/sales';

/** 나의 판매 포토카드 목록을 조회
 * @description
 * placeholderData: keepPreviousData,
 * 새 데이터를 받기 전까지 이전 데이터 유지
 */
export const useMySales = (filter) => {
  return useQuery({
    queryKey: QUERY_KEYS.mySales.list(filter),
    queryFn: () => getMySales(filter),
    placeholderData: keepPreviousData,
    select: (res) => ({
      ...res,
      mySales: res.data.mySales,
      gradeCounts: res.data.gradeCounts,
      genreCounts: res.data.genreCounts,
      saleStatusCounts: res.data.saleStatusCounts,
      saleMethodCounts: res.data.saleMethodCounts,
      meta: res.meta,
    }),
  });
};
