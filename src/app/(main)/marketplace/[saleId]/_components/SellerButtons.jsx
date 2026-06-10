'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export const SellerButtons = ({ sale }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-[1.25rem]">
        <Button
          size="thick"
          className="text-noto-20-bold"
          onClick={() => setShowEditModal(true)}
        >
          수정하기
        </Button>
        <Button
          size="thick"
          className="text-noto-20-bold"
          variant="secondary"
          onClick={() => setShowStopModal(true)}
        >
          판매 내리기
        </Button>
      </div>

      {/*
            {showEditModal && (
        <SaleEditModal onClose={() => setShowEditModal(false)} />
      )}
      {showStopModal && (
        <StopSaleModal onClose={() => setShowStopModal(false)} />
      )}
      */}
    </>
  );
};
