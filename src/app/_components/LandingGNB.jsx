'use client';

import { useAuth } from '@/context/AuthContext';
import { GNB } from '@/components/layout/GNB/GNB';

export const LandingGNB = () => {
  const { accessToken, logout } = useAuth();
  return <GNB isAuthenticated={!!accessToken} onLogout={logout} />;
};
