import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSales } from '@/services/sales';

// null/undefined/빈 문자열 값 제거 (URLSearchParams에 불필요한 쿼리 포함 방지)
const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  );

export const useSales = (params = {}) => {
  const cleanedParams = cleanParams(params);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.sales.list(cleanedParams),

    // pageParam: 현재 페이지 번호 (초기값 1, getNextPageParam에서 결정)
    queryFn: ({ pageParam = 1 }) =>
      getSales({ ...cleanedParams, page: pageParam }),

    initialPageParam: 1,

    // 마지막 페이지 응답 기준으로 다음 페이지 번호 반환, 마지막 페이지면 undefined
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },

    // 필터/검색 변경 시 이전 데이터를 유지해 깜빡임 방지
    placeholderData: keepPreviousData,

    select: (res) => ({
      sales: res.pages.flatMap((p) => p.data),
      meta: res.pages.at(-1).meta,
    }),
  });
};
