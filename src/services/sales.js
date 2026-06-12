import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 판매 목록 조회
export const getSales = (params = {}) =>
  fetchWithAuth(`/api/sales?${new URLSearchParams(params)}`);

// 판매 상세 조회
export const getSaleDetail = (saleId) => fetchWithAuth(`/api/sales/${saleId}`);

// 나의 판매 목록 조회
export const getMySales = (params = {}) =>
  fetchWithAuth(`/api/sales/me?${new URLSearchParams(params)}`);

// 판매 등록
export const createSale = (body) =>
  fetchWithAuth('/api/sales', {
    method: 'POST',
    body: JSON.stringify(body),
  });

// 판매 수정
export const updateSale = (saleId, body) =>
  fetchWithAuth(`/api/sales/${saleId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

// 판매 중단
export const cancelSale = (saleId) =>
  fetchWithAuth(`/api/sales/${saleId}/cancel`, {
    method: 'PATCH',
  });

// 구매
export const purchasePhotocard = (saleId, body) =>
  fetchWithAuth(`/api/sales/${saleId}/purchase`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
