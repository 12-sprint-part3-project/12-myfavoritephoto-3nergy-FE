import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { updateSale } from '@/services/sales';

export const useUpdateSale = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => updateSale(saleId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 보유 카드 목록 변경 (수량) - (판매 등록, 교환 제안)
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.sales.all() }); // 전체 판매 정보(수량, 가격) 변경
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 나의 판매 정보(수량, 가격) 변경
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 보유 카드 목록 변경 (수량)
    },
  });
};
