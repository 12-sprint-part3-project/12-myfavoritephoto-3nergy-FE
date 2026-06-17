import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { readNotification } from '@/services/notification';

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,

    onSuccess: (updatedNotification) => {
      queryClient.setQueryData(QUERY_KEYS.notifications.all(), (old) => ({
        notifications: (old?.notifications ?? []).map((n) =>
          n.id === updatedNotification.id ? { ...n, isRead: true } : n,
        ),
      }));
    },
  });
};
