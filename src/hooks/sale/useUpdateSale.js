import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { updateSale } from '@/services/sales';

export const useUpdateSale = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => updateSale(saleId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sales.detail(saleId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sales.lists() }); // 가격 수정 시 가격순 정렬 목록 캐시도 갱신 필요
    },
  });
};
