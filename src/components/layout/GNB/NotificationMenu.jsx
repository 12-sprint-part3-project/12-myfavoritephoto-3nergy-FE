import { NotificationItem } from '@/components/layout/GNB/NotificationItem';

export const NotificationMenu = ({ notifications = [] }) => {
  return (
    <div className="custom-scrollbar w-full overflow-y-auto bg-gray-500 md:max-h-[535px] md:w-[300px]">
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center py-[3rem]">
          <p className="text-noto-14-regular text-gray-300">알림이 없습니다.</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            isRead={notification.isRead}
            message={notification.message}
            createdAt={notification.createdAt}
          />
        ))
      )}
    </div>
  );
};
