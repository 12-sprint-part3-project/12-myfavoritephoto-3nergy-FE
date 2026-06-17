import { NotificationsView } from '@/app/(main)/my-notifications/NotificationsView';

export const metadata = {
  title: '알림',
  description: '내 알림 목록을 확인하세요.',
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
