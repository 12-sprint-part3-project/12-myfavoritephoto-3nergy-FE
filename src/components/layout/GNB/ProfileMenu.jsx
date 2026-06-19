'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const NAV_LINKS = [
  { label: '마켓플레이스', href: ROUTES.marketplace },
  { label: '마이갤러리', href: ROUTES.myGallery },
  { label: '판매 중인 포토카드', href: ROUTES.mySales },
];

export const ProfileMenu = ({ user, onLogout, onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-40 hidden md:block"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed top-0 left-0 z-50 flex h-screen w-[16.25rem] flex-col bg-gray-500 md:top-[4.375rem] md:right-[2.5rem] md:left-auto md:h-auto lg:top-[5rem] lg:right-[13.75rem]">
        <div className="border-b border-gray-400/50 px-5 pt-[2.6875rem] pb-5 md:pt-5">
          <p className="mb-5 text-noto-18-bold text-white md:mb-2">
            안녕하세요, {user?.nickname}님!
          </p>
          <div className="flex items-center justify-between">
            <span className="text-noto-12-light text-gray-300">
              보유 포인트
            </span>
            <span className="text-noto-12-regular text-main">
              {user?.points?.toLocaleString()} P
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-[0.9375rem] px-5 pt-[1.0625rem] pb-[1.3125rem]">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-noto-14-bold text-white transition-colors hover:text-main"
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-[2.6875rem] md:hidden">
          <button
            type="button"
            onClick={onLogout}
            className="cursor-pointer text-noto-14-regular text-gray-300 transition-colors hover:text-white"
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};
