'use client';

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSaleDetail } from '@/services/sales';

export const usePrefetchSaleDetail = () => {
  const queryClient = useQueryClient();

  const prefetchSaleDetail = (saleId) => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.sales.detail(saleId),
      queryFn: () => getSaleDetail(saleId),
    });
  };

  return prefetchSaleDetail;
};
