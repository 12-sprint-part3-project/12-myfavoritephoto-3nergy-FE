import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { updateSale } from '@/services/sales';

export const useUpdateSale = (saleId, photocardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => updateSale(saleId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sales.detail(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sales.lists() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.photocards.ownedQuantity(photocardId),
      });
    },
  });
};
