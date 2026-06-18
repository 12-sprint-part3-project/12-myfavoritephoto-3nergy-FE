'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { setToken } from '@/utils/token';

const GoogleCallbackHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (!accessToken) {
      router.replace('/login');
      return;
    }

    setToken(accessToken);
    login(accessToken);
    router.replace('/marketplace');
  }, [searchParams, router, login]);

  return null;
};

export default function GoogleCallbackPage() {
  return (
    <Suspense>
      <GoogleCallbackHandler />
    </Suspense>
  );
}
