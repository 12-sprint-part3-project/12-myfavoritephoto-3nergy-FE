import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { purchaseSale } from '@/services/sales';

export const usePurchaseSale = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['purchaseSale'],
    mutationFn: (quantity) => purchaseSale(saleId, quantity),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.sales.all() }); // 판매 상태/잔여 수량 변동
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 보유 포토카드 목록 (판매 등록, 교환 제안)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 구매자 마이갤러리
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 판매자 판매 목록
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.point.me() }); // 구매 시 포인트 차감

      // 품절된 경우 해당 판매의 교환 제안을 무효화
      const { status } = data.sale;
      if (status === 'SOLD_OUT') {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.trades.all() });
      }
    },
  });
};
