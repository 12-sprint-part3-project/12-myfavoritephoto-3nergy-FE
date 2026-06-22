'use client';

import { usePathname } from 'next/navigation';
import { RandomPointButton } from '@/components/layout/RandomPointButton';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';

const isHiddenPath = (pathname) => {
  if (pathname === '/my-notifications') {
    return true;
  }

  if (pathname === '/marketplace/create/result') {
    return true;
  }

  if (/^\/marketplace\/[^/]+\/purchase\/result$/.test(pathname)) {
    return true;
  }

  if (/^\/marketplace\/[^/]+\/trade\/result$/.test(pathname)) {
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
