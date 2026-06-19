import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { cancelSale } from '@/services/sales';

export const useCancelSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (saleId) => cancelSale(saleId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 보유 포토카드 목록 (판매 등록, 교환 제안)
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.sales.all() }); // 판매 상태 변동
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.trades.all() }); // 취소된 판매에 대한 교환 제안 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 내 판매 목록 상태 변동
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 구매자 보유 카드 목록 변동
    },
  });
};
