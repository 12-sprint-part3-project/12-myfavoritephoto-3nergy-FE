'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AlarmIcon, CaretLeftIcon, MenuIcon } from '@/icons';
import { NotificationMenu } from '@/components/layout/GNB/NotificationMenu';

export const GNB = ({
  isAuthenticated = false,
  user,
  pageTitle,
  notifications = [],
  onLogout,
  onMenuClick,
  onBack,
  onAlarmClick,
}) => {
  const isSubPage = Boolean(pageTitle);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-40 bg-black">
      <nav className="hidden w-full items-center sm:flex sm:h-[4.375rem] lg:h-[5rem]">
        <div className="flex w-full items-center justify-between sm:px-[2.5rem] lg:px-[13.75rem]">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="최애의포토"
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

          {isAuthenticated ? (
            <div className="text-noto-14-bold flex items-center gap-4 text-gray-200">
              <span>{user?.points?.toLocaleString()} P</span>
              <div ref={notificationRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen((prev) => !prev)}
                  aria-label="알림"
                  className="cursor-pointer"
                >
                  <AlarmIcon className="transition-colors hover:text-main" />
                </button>
                {isNotificationOpen && (
                  <div className="absolute top-full right-0 z-50 mt-2">
                    <NotificationMenu notifications={notifications} />
                  </div>
                )}
              </div>
              <span className="font-baskin-base text-baskin-18-bold text-gray-200">
                {user?.nickname}
              </span>
              <span className="text-gray-400">|</span>
              <button
                type="button"
                onClick={onLogout}
                className="cursor-pointer text-gray-400 transition-colors hover:text-white"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="text-noto-14-regular flex items-center gap-6 text-gray-200">
              <Link href="/login" className="hover:text-main transition-colors">
                로그인
              </Link>
              <Link
                href="/signup"
                className="hover:text-main transition-colors"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </nav>

      <nav className="flex h-[3.75rem] items-center justify-between px-6 sm:hidden">
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
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="메뉴"
              className="cursor-pointer"
            >
              <MenuIcon />
            </button>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="최애의포토"
                width={83}
                height={15}
                unoptimized
              />
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={onAlarmClick}
                aria-label="알림"
                className="cursor-pointer"
              >
                <AlarmIcon />
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
    </header>
  );
};
