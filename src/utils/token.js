export const getToken = () => localStorage.getItem('accessToken');
export const setToken = (token) => localStorage.setItem('accessToken', token);
export const clearToken = () => localStorage.removeItem('accessToken');
