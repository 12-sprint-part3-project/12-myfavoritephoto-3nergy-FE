import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 포인트 조회
export const getMyPoints = () => fetchWithAuth('/api/points/me');

// 랜덤 포인트 이벤트 참여 상태 조회 (뽑기 가능 여부, 잔여 대기 시간)
export const getPointEventStatus = () => fetchWithAuth('/api/points/event');

// 랜덤 포인트 이벤트
export const getPointEvent = () =>
  fetchWithAuth('/api/points/event', { method: 'POST' });
