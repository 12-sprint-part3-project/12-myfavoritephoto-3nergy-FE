import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';

/** 내 보유 포토카드 목록을 조회
 * @description
 * placeholderData: keepPreviousData,
 * 새 데이터를 받기 전까지 이전 데이터 유지
 */
export const usePhotocards = (filter) => {
  return useQuery({
    queryKey: QUERY_KEYS.myGallery.list(filter),
    queryFn: () => getPhotocards(filter),
    placeholderData: keepPreviousData,
    select: (res) => ({
      ...res,
      photocards: res.data.photocards,
      gradeCounts: res.data.gradeCounts,
      genreCounts: res.data.genreCounts,
      meta: res.meta,
    }),
  });
};
