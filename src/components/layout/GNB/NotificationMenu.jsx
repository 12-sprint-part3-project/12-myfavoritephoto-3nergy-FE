import { NotificationItem } from '@/components/layout/GNB/NotificationItem';

export const NotificationMenu = ({
  notifications = [],
  onRead,
  className = 'md:max-h-[535px] md:w-[300px]',
}) => {
  return (
    <ul
      aria-label="알림 목록"
      className={`custom-scrollbar w-full overflow-y-auto bg-gray-500 ${className}`}
    >
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center py-[3rem]">
          <p className="text-noto-14-regular text-gray-300">알림이 없습니다.</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <li key={notification.id}>
            <NotificationItem
              key={notification.id}
              id={notification.id}
              isRead={notification.isRead}
              message={notification.message}
              createdAt={notification.createdAt}
              path={notification.path}
              onRead={onRead}
            />
          </li>
        ))
      )}
    </ul>
  );
};
