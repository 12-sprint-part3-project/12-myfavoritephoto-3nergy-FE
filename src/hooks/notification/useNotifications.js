import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getNotifications } from '@/services/notification';
import { getNotificationPath } from '@/utils/getNotificationPath';
import { formatNotificationMessage } from '@/utils/formatNotificationMessage';

export const useNotifications = () => {
  return useQuery({
    queryKey: QUERY_KEYS.notifications.all(),
    queryFn: getNotifications,
    select: (data) =>
      (data.notifications ?? []).map((n) => ({
        ...n,
        message: formatNotificationMessage(n),
        path: getNotificationPath(n),
      })),
  });
};
