'use client';

import { useNotifications } from '@/hooks/notification/useNotifications';
import { useReadNotification } from '@/hooks/notification/useReadNotification';
import { NotificationMenu } from '@/components/layout/GNB/NotificationMenu';

export default function NotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications();
  const { mutate: markAsRead } = useReadNotification();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-[3rem]">
        <p className="text-noto-14-regular text-gray-300">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <NotificationMenu
        notifications={notifications}
        onRead={markAsRead}
        className="max-h-none"
      />
    </div>
  );
}
