import { fetchWithAuth } from '@/lib/api/fetchWithAuth';

export const getMe = () => fetchWithAuth('/api/users/me');
