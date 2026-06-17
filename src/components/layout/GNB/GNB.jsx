'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlarmIcon, CaretLeftIcon, MenuIcon, DotIcon } from '@/icons';
import { APP_NAME } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { NotificationMenu } from '@/components/layout/GNB/NotificationMenu';
import { ProfileMenu } from '@/components/layout/GNB/ProfileMenu';

export const GNB = ({
  isAuthenticated = false,
  user,
  pageTitle,
  notifications = [],
  onLogout,
  onMenuClick,
  onBack,
  onMarkAsRead,
}) => {
  const router = useRouter();

  const isSubPage = Boolean(pageTitle);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!notificationRef.current?.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  return (
    <header className="sticky top-0 z-40 bg-black">
      {/* PC, 태블릿 */}
      <nav className="hidden w-full items-center md:flex md:h-[4.375rem] lg:h-[5rem]">
        <div className="flex w-full items-center justify-between md:px-[2.5rem] lg:px-[13.75rem]">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt={APP_NAME}
              width={111}
              height={20}
              unoptimized
              className="block lg:hidden"
            />
            <Image
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              width={139}
              height={25}
              unoptimized
              className="hidden lg:block"
            />
          </Link>

          {/* 로그인한 경우 */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4 text-noto-14-bold text-gray-200">
              <span>{user?.points?.toLocaleString()} P</span>

              {/* 알람 아이콘 */}
              <div ref={notificationRef} className="relative h-6 w-6">
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen((prev) => !prev)}
                  aria-label="알림"
                  className="h-6 w-6 cursor-pointer"
                >
                  <AlarmIcon className="text-gray-200 transition-colors hover:text-main" />
                  {hasUnread && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red px-1 text-noto-12-bold text-[10px] leading-none text-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* 알람 아이콘이 클릭된 경우 알람 목록 */}
                {isNotificationOpen && (
                  <div className="absolute top-full right-0 z-50 mt-2">
                    <NotificationMenu
                      notifications={notifications}
                      onRead={onMarkAsRead}
                    />
                  </div>
                )}
              </div>

              {/* 닉네임 - 클릭 시 프로필 표시 */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="font-baskin-base cursor-pointer text-baskin-18-bold text-gray-200"
              >
                {user?.nickname}
              </button>

              <span className="text-gray-400">|</span>

              {/* 로그아웃 */}
              <button
                type="button"
                onClick={onLogout}
                className="cursor-pointer text-gray-400 transition-colors hover:text-white"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6 text-noto-14-regular text-gray-200">
              <Link href="/login" className="transition-colors hover:text-main">
                로그인
              </Link>
              <Link
                href="/signup"
                className="transition-colors hover:text-main"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* 모바일 */}
      <nav className="flex h-[3.75rem] items-center justify-between px-6 md:hidden">
        {/* 랜딩 페이지, 마켓플레이스 페이지를 제외한 페이지들 */}
        {isSubPage ? (
          <>
            <button
              type="button"
              onClick={onBack}
              aria-label="뒤로가기"
              className="cursor-pointer"
            >
              <CaretLeftIcon />
            </button>
            <span className="font-baskin-base text-baskin-18-bold text-white">
              {pageTitle}
            </span>
            <div className="h-6 w-6" aria-hidden="true" />
          </>
        ) : (
          <>
            {/* 랜딩 페이지, 마켓플레이스 페이지 */}
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                onMenuClick?.();
              }}
              aria-label="메뉴"
              className="cursor-pointer"
            >
              <MenuIcon />
            </button>

            <Link href="/">
              <Image
                src="/logo.svg"
                alt={APP_NAME}
                width={83}
                height={15}
                unoptimized
              />
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => router.push(ROUTES.notifications)}
                aria-label="알림"
                className="relative h-6 w-6 cursor-pointer"
              >
                <AlarmIcon className="text-gray-200" />
                {hasUnread && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red px-1 text-noto-12-bold text-[10px] leading-none text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            ) : (
              <Link
                href="/login"
                className="text-noto-14-regular text-gray-200"
              >
                로그인
              </Link>
            )}
          </>
        )}
      </nav>

      {isProfileOpen && isAuthenticated && (
        <ProfileMenu
          user={user}
          onLogout={onLogout}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};
