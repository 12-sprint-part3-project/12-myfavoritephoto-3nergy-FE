import { fetchClient } from '@/lib/api/fetchClient';
import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

// 회원가입
export const signup = (body) =>
  fetchClient('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  });

// 로그인
export const login = (body) =>
  fetchClient('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });

// 로그아웃
export const logout = () =>
  fetchWithAuth('/api/auth/logout', { method: 'POST' });

// NOTE: 토큰 재발급은 외부에서 사용할 일이 없으므로 작성하지 않음
// (lib/auth/refreshToken.js에서 이미 처리하고 있고 fetchWithAuth에서 자동 호출)
