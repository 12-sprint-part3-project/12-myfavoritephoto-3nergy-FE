import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { cancelSale } from '@/services/sales';

export const useCancelSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (saleId) => cancelSale(saleId),

    onSuccess: (_, saleId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sales.detail(saleId),
      });
    },
  });
};
