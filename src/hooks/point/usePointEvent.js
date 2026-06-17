import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPointEvent } from '@/services/point';

export const usePointEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getPointEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.point.me() });
    },
  });
};
