export const getToken = () => {
  if (typeof window === 'undefined') {
    return null; // 서버에서는 null 반환
  }
  return localStorage.getItem('accessToken');
};
export const setToken = (token) => localStorage.setItem('accessToken', token);
export const clearToken = () => localStorage.removeItem('accessToken');
