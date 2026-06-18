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
      }); // 상세
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sales.lists() }); // 마켓플레이스 목록
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 나의 판매 목록
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 마이갤러리
    },
  });
};
