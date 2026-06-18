import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 포인트 조회
export const getMyPoints = () => fetchWithAuth('/api/points/me');

// 랜덤 포인트 이벤트
export const getPointEvent = () =>
  fetchWithAuth('/api/points/event', { method: 'POST' });
