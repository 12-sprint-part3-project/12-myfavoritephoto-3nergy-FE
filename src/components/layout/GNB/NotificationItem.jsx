import { formatRelativeTime } from '@/utils/formatRelativeTime';

export const NotificationItem = ({
  isRead,
  message,
  createdAt,
  className = '',
}) => {
  const bgClass = isRead ? '' : 'bg-white/20';
  const textClass = isRead ? 'text-gray-300' : 'text-white';

  return (
    <div
      className={`flex w-full flex-col gap-[0.62rem] border-b-1 border-gray-400 px-[1.25rem] pt-[1.25rem] pb-[1.63rem] md:pb-[1.81rem] ${bgClass} ${className}`}
    >
      <p className={`text-noto-14-regular ${textClass}`}>{message}</p>
      <span className="text-noto-12-light text-gray-300">
        {formatRelativeTime(createdAt)}
      </span>
    </div>
  );
};
