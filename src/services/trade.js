import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 교환 제안 조회
export const getTrades = (saleId) => fetchWithAuth(`/api/trades/${saleId}`);

// 교환 제안
export const createTrade = (saleId, body) =>
  fetchWithAuth(`/api/trades/${saleId}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

// 교환 제안 수락
export const acceptTrade = (tradeId) =>
  fetchWithAuth(`/api/trades/${tradeId}/accept`, { method: 'PATCH' });

// 교환 제안 거절
export const rejectTrade = (tradeId) =>
  fetchWithAuth(`/api/trades/${tradeId}/reject`, { method: 'PATCH' });

// 교환 제안 취소
export const cancelTrade = (tradeId) =>
  fetchWithAuth(`/api/trades/${tradeId}/cancel`, { method: 'PATCH' });
