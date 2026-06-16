import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { createTrade } from '@/services/trade';

export const useCreateTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createTrade'],
    mutationFn: (body) => createTrade(saleId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.trades.bySale(saleId),
      });
    },
  });
};
