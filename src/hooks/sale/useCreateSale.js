import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { createSale } from '@/services/sales';

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createSale'],
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sales.lists(),
      });
    },
  });
};
