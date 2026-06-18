'use client';

import { RandomPointButton } from '@/components/layout/RandomPointButton';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';

export const FloatingButtons = () => (
  <div className="fixed bottom-[50px] right-[50px] z-40 flex flex-col items-center gap-2.5 md:gap-5">
    <RandomPointButton />
    <ScrollTopButton />
  </div>
);
