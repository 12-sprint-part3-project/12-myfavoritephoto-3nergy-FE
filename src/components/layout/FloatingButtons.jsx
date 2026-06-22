'use client';

import { usePathname } from 'next/navigation';
import { RandomPointButton } from '@/components/layout/RandomPointButton';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';

const PURCHASE_RESULT_REGEX = /^\/marketplace\/[^/]+\/purchase\/result$/;
const TRADE_RESULT_REGEX = /^\/marketplace\/[^/]+\/trade\/result$/;
const EDIT_REGEX = /^\/marketplace\/[^/]+\/edit$/;
const TRADE_FORM_REGEX = /^\/marketplace\/[^/]+\/trade$/;

const isHiddenPath = (pathname) => {
  if (pathname === '/my-notifications') {
    return true;
  }

  if (
    pathname === '/marketplace/create' ||
    pathname === '/marketplace/create/result'
  ) {
    return true;
  }

  if (pathname === '/my-gallery/new' || pathname === '/my-gallery/new/result') {
    return true;
  }

  if (PURCHASE_RESULT_REGEX.test(pathname)) {
    return true;
  }

  if (TRADE_RESULT_REGEX.test(pathname)) {
    return true;
  }

  if (EDIT_REGEX.test(pathname)) {
    return true;
  }

  if (TRADE_FORM_REGEX.test(pathname)) {
    return true;
  }

  return false;
};

export const FloatingButtons = () => {
  const pathname = usePathname();

  if (isHiddenPath(pathname)) {
    return null;
  }

  return (
    <div className="fixed right-[0.9375rem] bottom-[100px] z-40 flex flex-col items-center gap-2.5 md:right-[1.25rem] md:bottom-[50px] md:gap-5">
      <RandomPointButton />
      <ScrollTopButton />
    </div>
  );
};
