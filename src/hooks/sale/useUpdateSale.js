import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { updateSale } from '@/services/sales';

export const useUpdateSale = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => updateSale(saleId, body),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.sales.detail(saleId));
    },
  });
};
