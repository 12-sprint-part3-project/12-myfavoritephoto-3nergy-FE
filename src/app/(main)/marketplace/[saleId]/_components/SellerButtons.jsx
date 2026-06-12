'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateSale } from '@/hooks/sale/useUpdateSale';
import { Button } from '@/components/ui/Button';
import { BasicModal } from '@/components/ui/BasicModal';
import { SaleEditModal } from '@/app/(main)/marketplace/[saleId]/_components/SaleEditModal';
import { useIsMobile } from '@/hooks/common/useResponsive';

export const SellerButtons = ({ sale }) => {
  const {
    mutate: updateSale,
    isPending,
    error: updateError,
  } = useUpdateSale(sale.saleId);

  const router = useRouter();
  const isMobile = useIsMobile();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelSale = () => {
    /*
    cancelSale(sale.saleId, {
      onSuccess: () => setShowCancelModal(false),
    });
    */
  };

  const handlewEditSale = (formData) => {
    updateSale(formData, {
      onSuccess: () => setShowEditModal(false),
    });
  };
  console.log('updateError:', updateError);

  // 수정하기 버튼 클릭 시 모바일이면 페이지 이동, 태블릿/pc면 모달
  const handleEditClick = () => {
    if (isMobile) {
      router.push(`/marketplace/${sale.saleId}/edit`);
    } else {
      setShowEditModal(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[1.25rem]">
        <Button
          size="thick"
          className="text-noto-18-bold lg:text-noto-20-bold"
          onClick={handleEditClick}
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
          isPending={isPending}
          quantityError={
            updateError?.code === 'NOT_ENOUGH_QUANTITY'
              ? updateError.message
              : ''
          }
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
