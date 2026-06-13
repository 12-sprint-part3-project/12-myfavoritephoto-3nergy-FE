import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 보유 포토카드 목록 조회
export const getPhotocards = (params = {}) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== '' && v !== null && v !== undefined,
    ),
  );
  return fetchWithAuth(
    `/api/photocards?${new URLSearchParams(filteredParams)}`,
  );
};

// 포토카드 생성
export const createPhotocard = (body) =>
  fetchWithAuth('/api/photocards', {
    method: 'POST',
    body: JSON.stringify(body),
  });
