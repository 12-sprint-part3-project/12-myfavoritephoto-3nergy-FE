import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';

/** 내 보유 포토카드 목록을 조회 */
export const usePhotocards = () => {
  return useQuery({
    queryKey: QUERY_KEYS.myGallery.list(),
    queryFn: () => getPhotocards(),
  });
};
