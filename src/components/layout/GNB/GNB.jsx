'use client';

import Link from 'next/link';
import { AlarmIcon, CaretLeftIcon, MenuIcon, ProfileIcon } from '@/icons';

export const GNB = ({
  isAuthenticated = false,
  user,
  pageTitle,
  onLogout,
  onMenuClick,
  onAlarmClick,
  onProfileClick,
  onBack,
}) => {
  const isSubPage = Boolean(pageTitle);

  return (
    <header className="bg-black">
      <nav className="hidden h-[3.75rem] items-center justify-between px-10 md:flex">
        <Link
          href="/"
          className="font-baskin-base text-baskin-24-bold text-white"
        >
          최애<span className="text-main">의</span>포토
        </Link>

        {isAuthenticated ? (
          <div className="text-noto-16-regular flex items-center gap-4 text-white">
            <span>{user?.points?.toLocaleString()} P</span>
            <button
              type="button"
              onClick={onAlarmClick}
              aria-label="알림"
              className="cursor-pointer"
            >
              <AlarmIcon className="h-6 w-6 text-white" />
            </button>
            <span>{user?.nickname}</span>
            <span className="text-gray-400">|</span>
            <button
              type="button"
              onClick={onLogout}
              className="text-noto-16-regular cursor-pointer text-gray-300 transition-colors hover:text-white"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="text-noto-16-regular flex items-center gap-6 text-white">
            <Link href="/login" className="hover:text-main transition-colors">
              로그인
            </Link>
            <Link href="/signup" className="hover:text-main transition-colors">
              회원가입
            </Link>
          </div>
        )}
      </nav>

      <nav className="flex h-[3.4375rem] items-center justify-between px-4 md:hidden">
        {isSubPage ? (
          <>
            <button
              type="button"
              onClick={onBack}
              aria-label="뒤로가기"
              className="cursor-pointer"
            >
              <CaretLeftIcon className="h-6 w-6 text-white" />
            </button>
            <span className="font-baskin-base text-baskin-24-bold text-white">{pageTitle}</span>
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
              <MenuIcon className="h-6 w-6 text-white" />
            </button>
            <Link
              href="/"
              className="font-baskin-base text-baskin-18-bold text-white"
            >
              최애<span className="text-main">의</span>포토
            </Link>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onProfileClick}
                aria-label="프로필"
                className="cursor-pointer"
              >
                <ProfileIcon className="h-6 w-6 text-white" />
              </button>
            ) : (
              <Link href="/login" className="text-noto-14-regular text-white">
                로그인
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
