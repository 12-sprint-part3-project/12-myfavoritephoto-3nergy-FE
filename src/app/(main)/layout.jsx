'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useMe } from '@/hooks/user/useMe';
import { useMyPoints } from '@/hooks/point/useMyPoints';
import { useLogout } from '@/hooks/auth/useLogout';
import { GNB } from '@/components/layout/GNB/GNB';
import { getGnbConfig } from '@/components/layout/GNB/gnb.config';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const config = getGnbConfig(pathname);

  const { accessToken } = useAuth();
  const isAuthenticated = Boolean(accessToken);
  const { data: user } = useMe();
  const { data: points } = useMyPoints();
  const { mutate: logout } = useLogout();

  return (
    <div className="flex min-h-screen flex-col">
      <GNB
        isAuthenticated={isAuthenticated}
        user={user ? { ...user, points } : user}
        onLogout={() => logout()}
        pageTitle={config?.title ?? null}
        onBack={() => router.back()}
      />

      <main className="mx-auto w-full max-w-[1480px] px-[0.9375rem] pt-[1.25rem] md:px-[1.25rem] md:pt-[2.5rem] xl:pt-[3.75rem]">
        {children}
      </main>
    </div>
  );
}
