'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { BasicModal } from '@/components/ui/BasicModal';
import { SaleEditModal } from '@/app/(main)/marketplace/[saleId]/_components/SaleEditModal';

export const SellerButtons = ({ sale }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelSale = () => {
    setShowCancelModal(false);
    // TODO: 판매 중단 API 연동
  };

  const handlewEditSale = () => {
    setShowEditModal(false);
    // TODO: 판매 수정 API 연동
  };

  return (
    <>
      <div className="flex flex-col gap-[1.25rem]">
        <Button
          size="thick"
          className="text-noto-18-bold lg:text-noto-20-bold"
          onClick={() => setShowEditModal(true)}
        >
          수정하기
        </Button>
        <Button
          size="thick"
          className="text-noto-18-bold lg:text-noto-20-bold"
          variant="secondary"
          onClick={() => setShowCancelModal(true)}
        >
          판매 내리기
        </Button>
      </div>

      {/* 포토카드 정보 수정 모달 */}
      {showEditModal && (
        <SaleEditModal
          onClose={() => setShowEditModal(false)}
          sale={sale}
          onSubmit={handlewEditSale}
        />
      )}

      {/* 판매 내리기 확인 모달 */}
      {showCancelModal && (
        <BasicModal
          title="포토카드 판매 내리기"
          buttonText="판매 내리기"
          onClose={() => setShowCancelModal(false)}
          onClick={handleCancelSale}
        >
          정말로 판매를 중단하시겠습니까?
        </BasicModal>
      )}
    </>
  );
};
