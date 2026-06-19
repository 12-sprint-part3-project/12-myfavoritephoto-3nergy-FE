import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { rejectTrade } from '@/services/trade';

export const useRejectTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeId) => rejectTrade(tradeId),

    onSuccess: () => {
      // 거절 시 판매자가 현재 보고 있는 교환 목록은 즉시 갱신
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });

      // 나머지는 다음 접근 시 갱신
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 제안자의 판매 목록에서 교환 제안 상태 반영
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 제안자의 보유 포토카드 수량 복구
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 제안자의 보유 포토카드 수량 복구
    },
  });
};
