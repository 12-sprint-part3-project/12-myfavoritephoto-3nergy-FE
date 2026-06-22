'use client';

import { RandomPointButton } from '@/components/layout/RandomPointButton';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';

export const FloatingButtons = () => (
  <div className="fixed right-[0.9375rem] bottom-[100px] z-40 flex flex-col items-center gap-2.5 md:right-[1.25rem] md:bottom-[50px] md:gap-5">
    <RandomPointButton />
    <ScrollTopButton />
  </div>
);
