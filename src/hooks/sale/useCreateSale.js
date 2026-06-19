import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { createSale } from '@/services/sales';

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createSale'],
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 보유 포토카드 목록 (판매 등록, 교환 제안)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sales.lists() }); // 마켓플레이스 목록
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 나의 판매 목록
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 마이갤러리 (카드 상태 변경)
    },
  });
};
