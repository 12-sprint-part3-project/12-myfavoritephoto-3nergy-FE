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
      // 나머지는 해당 페이지 진입 시 최신 상태로 동기화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sales.detail(saleId),
      });
    },
  });
};
