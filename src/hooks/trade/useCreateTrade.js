import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { createTrade } from '@/services/trade';

export const useCreateTrade = (saleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createTrade'],
    mutationFn: (body) => createTrade(saleId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.trades.all() });
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.mySales.all() }); // 교환 제시 목록을 내 판매에 추가
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() }); // 제안자 보유 포토카드 수량 차감
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() }); // 제안자 보유 포토카드 수량 차감
    },
  });
};
