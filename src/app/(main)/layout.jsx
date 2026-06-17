'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useMe } from '@/hooks/user/useMe';
import { useMyPoints } from '@/hooks/point/useMyPoints';
import { useLogout } from '@/hooks/auth/useLogout';
import { useNotifications } from '@/hooks/notification/useNotifications';
import { useNotificationSSE } from '@/hooks/notification/useNotificationSSE';
import { useReadNotification } from '@/hooks/notification/useReadNotification';
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

  const { data: notifications = [] } = useNotifications();
  const { mutate: markAsRead } = useReadNotification();
  useNotificationSSE();

  return (
    <div className="flex min-h-screen flex-col">
      <GNB
        isAuthenticated={isAuthenticated}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        user={user ? { ...user, points } : user}
        onLogout={() => logout()}
        pageTitle={config?.title ?? null}
        onBack={() => router.back()}
      />

      <main className="mx-auto w-full max-w-[1480px]">{children}</main>
    </div>
  );
}
