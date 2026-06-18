import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSaleDetail } from '@/services/sales';

export const useSaleDetail = (saleId) => {
  return useQuery({
    queryKey: QUERY_KEYS.sales.detail(saleId),
    queryFn: () => getSaleDetail(saleId),
    enabled: !!saleId, // saleId 없으면 실행 안 함
  });
};
