import { cache } from 'react';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';
import { fetchPublic } from '@/lib/api/fetchPublic';

// 판매 목록 조회
export const getSales = (params = {}) => {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== '' && v !== null && v !== undefined,
    ),
  );
  return fetchPublic(`/api/sales?${new URLSearchParams(filtered)}`);
};

// 판매 상세 조회
export const getSaleDetail = cache((saleId) =>
  fetchPublic(`/api/sales/${saleId}`),
);

// 나의 판매 목록 조회
export const getMySales = (params = {}) => {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== '' && v !== null && v !== undefined,
    ),
  );
  return fetchWithAuth(`/api/sales/me?${new URLSearchParams(filtered)}`);
};

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
export const purchaseSale = (saleId, quantity) =>
  fetchWithAuth(`/api/sales/${saleId}/purchase`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  });
