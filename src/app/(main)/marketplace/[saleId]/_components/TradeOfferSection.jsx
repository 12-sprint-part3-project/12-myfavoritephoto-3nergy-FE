'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GRADE_STYLE, GENRE } from '@/constants/card';
import { useIsMobile } from '@/hooks/common/useResponsive';
import { usePrefetchPhotocardList } from '@/hooks/photocard/usePrefetchPhotocardList';
import { Button } from '@/components/ui/Button';
import { PageTitle } from '@/components/layout/PageTitle';
import dynamic from 'next/dynamic';

const TradeOfferModal = dynamic(() =>
  import('@/app/(main)/marketplace/[saleId]/_components/TradeOfferModal').then(
    (m) => m.TradeOfferModal,
  ),
);

export const TradeOfferSection = ({ sale }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showTradeModalOpen, setShowTradeModalOpen] = useState(false);

  usePrefetchPhotocardList(
    isMobile ? `/marketplace/${sale.saleId}/trade` : undefined,
  );

  const handleCreateClick = () => {
    if (isMobile) {
      router.push(`/marketplace/${sale.saleId}/trade`);
    } else {
      setShowTradeModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[2.88rem] md:gap-[2.5rem] lg:gap-[3.75rem]">
        <PageTitle
          title="교환 희망 정보"
          variant="heading"
          actions={
            // 모바일에서 숨기고 md부터 보이게
            <div className="hidden md:block">
              <Button
                size="lg"
                onClick={handleCreateClick}
                className="w-full text-noto-16-bold md:w-[342px] lg:w-[440px] lg:text-noto-18-bold"
              >
                포토카드 교환하기
              </Button>
            </div>
          }
        />

        {/*교환 희망 정보 - 설명, 등급, 장르*/}
        <div className="flex flex-col gap-[1.25rem]">
          <p className="text-noto-18-bold whitespace-pre-wrap text-white lg:text-noto-24-bold">
            {sale.desiredDescription}
          </p>
          <div className="flex gap-[0.62rem] lg:gap-[0.9375rem]">
            <span className={GRADE_STYLE[sale.desiredGrade]?.textColor}>
              {GRADE_STYLE[sale.desiredGrade]?.label}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{GENRE[sale.desiredGenre]}</span>
          </div>
        </div>

        {/* 모바일에서만 버튼 하단에 표시 */}
        <div className="md:hidden">
          <Button
            size="lg"
            onClick={handleCreateClick}
            className="w-full text-noto-16-bold"
          >
            포토카드 교환하기
          </Button>
        </div>
      </div>

      {showTradeModalOpen && (
        <TradeOfferModal
          sale={sale}
          onClose={() => setShowTradeModalOpen(false)}
        />
      )}
    </>
  );
};
