'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
//import { useMe } from '@/hooks/user/useMe';
import { GNB } from '@/components/layout/GNB/GNB';
import { getGnbConfig } from '@/components/layout/GNB/gnb.config';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const config = getGnbConfig(pathname);

  const { accessToken, logout } = useAuth();

  /*
  // TODO: 내 정보 조회 API 연동
  const { data: user } = useMe({
    enabled: !!accessToken,
  });
  */

  return (
    <div className="flex flex-col">
      {/* TODO: user={user} 추가 */}
      <GNB
        isAuthenticated={!!accessToken}
        onLogout={logout}
        pageTitle={config?.title ?? null}
        onBack={() => router.back()}
      />

      <main className="mx-auto w-full max-w-[1480px] px-[0.9375rem] md:px-[1.25rem]">
        {children}
      </main>
    </div>
  );
}
