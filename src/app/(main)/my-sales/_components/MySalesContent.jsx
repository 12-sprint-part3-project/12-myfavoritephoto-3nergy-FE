'use client';

import { OwnedCardsInfo } from '@/app/(main)/my-sales/_components/OwnedCardsInfo';
import { MySalesCardSection } from '@/app/(main)/my-sales/_components/MySalesCardSection';

export const MySalesContent = () => {
  return (
    <>
      <OwnedCardsInfo />

      <MySalesCardSection />
    </>
  );
};
