import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 알림 목록 조회
export const getNotifications = () => fetchWithAuth('/api/notifications');

// 알림 읽음 처리
export const readNotification = (notificationId) =>
  fetchWithAuth(`/api/notifications/${notificationId}/read`, {
    method: 'PATCH',
  });
