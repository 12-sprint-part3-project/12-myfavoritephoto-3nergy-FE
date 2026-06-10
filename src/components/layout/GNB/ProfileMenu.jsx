'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { label: '마켓플레이스', href: '/maketplace' },
  { label: '마이갤러리', href: '/my-gallery' },
  { label: '판매 중인 포토카드', href: '/my-sales' },
];

export const ProfileMenu = ({ user, onLogout, onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-40 hidden sm:block"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed top-0 left-0 z-50 flex h-screen w-[16.25rem] flex-col bg-gray-500 sm:top-[4.375rem] sm:right-[2.5rem] sm:left-auto sm:h-auto lg:top-[5rem] lg:right-[13.75rem]">
        <div className="border-b border-gray-400/50 px-5 pt-[2.6875rem] pb-5 sm:pt-5">
          <p className="text-noto-18-bold mb-5 text-white sm:mb-2">
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
              className="text-noto-14-bold hover:text-main text-white transition-colors"
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-[2.6875rem] sm:hidden">
          <button
            type="button"
            onClick={onLogout}
            className="text-noto-14-regular cursor-pointer text-gray-300 transition-colors hover:text-white"
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};
