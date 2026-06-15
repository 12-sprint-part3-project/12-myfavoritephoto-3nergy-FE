import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';

export const usePhotocardSelectList = (params = {}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.photocards.list(params),

    // pageParam: 현재 페이지 번호 (초기값 1, getNextPageParam에서 결정)
    queryFn: ({ pageParam = 1 }) =>
      getPhotocards({ ...params, page: pageParam }),

    initialPageParam: 1,

    // 마지막 페이지 응답 기준으로 다음 페이지 번호 반환, 마지막 페이지면 undefined
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },

    // 필터/검색 변경 시 이전 데이터를 유지해 깜빡임 방지
    placeholderData: keepPreviousData,

    select: (res) => ({
      photocards: res.pages.flatMap((p) => p.data.photocards),
      meta: res.pages.at(-1).meta,
      gradeCounts: res.pages[0].data.gradeCounts,
    }),
  });
};
