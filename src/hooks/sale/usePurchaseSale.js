import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { purchaseSale } from '@/services/sales';

export const usePurchaseSale = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quantity) => purchaseSale(saleId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sales.detail(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sales.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.point.me() }); // 구매 시 포인트 차감
    },
  });
};
