import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { acceptTrade } from '@/services/trade';

export const useAcceptTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeId) => acceptTrade(tradeId),

    onSuccess: () => {
      // 수락 시 판매자가 현재 보고 있는 교환 목록은 즉시 갱신
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });
      // 나머지는 다음 접근 시 갱신
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sales.all() }); // 판매 상태/잔여수량 변동 (매진 가능)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 양쪽 보유 포토카드 목록 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 양쪽 판매 목록 상태 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 양쪽 보유  포토카드 목록 갱신
    },
  });
};
