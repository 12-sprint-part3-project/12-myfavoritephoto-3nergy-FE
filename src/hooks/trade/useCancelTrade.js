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
      // 취소 시 제안자가 현재 보고 있는 교환 목록은 즉시 갱신
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.trades.myOffer(saleId),
      });

      // 나머지는 다음 접근 시 갱신
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // / 교환 제시가 사라졌으므로 제안자의 거래 목록 업데이트
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 제안자 보유 포토카드 수량 복구
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 제안자 보유 포토카드 수량 복구
    },
  });
};
