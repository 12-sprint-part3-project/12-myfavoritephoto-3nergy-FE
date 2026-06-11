'use client';

import { GNB } from '@/components/layout/GNB/GNB';
import { useAuth } from '@/context/AuthContext';
import { useMe } from '@/hooks/user/useMe';
import { useLogout } from '@/hooks/auth/useLogout';

export default function MainLayout({ children }) {
  const { accessToken } = useAuth();
  const isAuthenticated = Boolean(accessToken);
  const { data: user } = useMe();
  const { mutate: logout } = useLogout();

  return (
    <div className="flex min-h-screen flex-col">
      <GNB
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={() => logout()}
      />
      <main className="mx-auto w-full max-w-[1480px] px-[15px] pt-[20px] md:px-[20px] md:pt-[40px] xl:pt-[60px]">
        {children}
      </main>
    </div>
  );
}
