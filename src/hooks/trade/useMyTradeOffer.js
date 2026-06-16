import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMyTradeOffer } from '@/services/trade';

export const useMyTradeOffer = (saleId) => {
  return useQuery({
    queryKey: QUERY_KEYS.trades.myOffer(saleId),
    queryFn: () => getMyTradeOffer(saleId),
    enabled: !!saleId,
    select: (data) => data.trades,
  });
};
