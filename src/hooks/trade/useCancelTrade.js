import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { cancelTrade } from '@/services/trade';

export const useCancelTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeId) => cancelTrade(tradeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });
    },
  });
};
