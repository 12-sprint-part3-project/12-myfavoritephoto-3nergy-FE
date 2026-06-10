export const useSaleDetail = (saleId) => {
  return useQuery({
    queryKey: QUERY_KEYS.sales.detail(saleId),
    queryFn: () => fetchClient(`/api/sales/${saleId}`),
    select: (data) => data.sale, // sale 한 번만 풀어줌
  });
};
