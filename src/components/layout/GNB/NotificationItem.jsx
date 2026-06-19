import { useRouter } from 'next/navigation';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

export const NotificationItem = ({
  id,
  isRead,
  message,
  createdAt,
  path,
  onRead,
  className = '',
}) => {
  const router = useRouter();

  const bgClass = isRead ? '' : 'bg-white/20';
  const textClass = isRead ? 'text-gray-300' : 'text-white';

  const handleClick = () => {
    if (!isRead) onRead?.(id);
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full cursor-pointer flex-col gap-[0.62rem] border-b-1 border-gray-400 px-[1.25rem] pt-[1.25rem] pb-[1.63rem] text-left md:pb-[1.81rem] ${bgClass} ${className}`}
    >
      <p className={`text-noto-14-regular ${textClass}`}>{message}</p>
      <span className="text-noto-12-light text-gray-300">
        {formatRelativeTime(createdAt)}
      </span>
    </button>
  );
};
