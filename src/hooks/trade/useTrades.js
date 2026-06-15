import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getTrades } from '@/services/trade';

export const useTrades = (saleId) => {
  return useQuery({
    queryKey: QUERY_KEYS.trades.bySale(saleId),
    queryFn: () => getTrades(saleId),
    enabled: !!saleId,
    select: (data) => data.trades,
  });
};
