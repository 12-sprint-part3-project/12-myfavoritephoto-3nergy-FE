import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { rejectTrade } from '@/services/trade';

export const useRejectTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeId) => rejectTrade(tradeId),

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() });
    },
  });
};
