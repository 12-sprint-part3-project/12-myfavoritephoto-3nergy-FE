import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { cancelTrade } from '@/services/trade';

export const useCancelTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeId) => cancelTrade(tradeId),

    onMutate: async (tradeId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.mySales.all() });

      const previousMySales = queryClient.getQueriesData({
        queryKey: QUERY_KEYS.mySales.all(),
      });

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.mySales.all() },
        (old) => {
          if (!old?.data?.mySales) return old;
          return {
            ...old,
            data: {
              ...old.data,
              mySales: old.data.mySales.filter(
                (sale) => sale.tradeId !== tradeId,
              ),
            },
          };
        },
      );

      return { previousMySales };
    },

    onError: (err, variables, context) => {
      context?.previousMySales?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() });
    },
  });
};
