'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToastContext } from '@/context/ToastContext';
import { useIsMobile } from '@/hooks/common/useResponsive';
import { useUpdateSale } from '@/hooks/sale/useUpdateSale';
import { useCancelSale } from '@/hooks/sale/useCancelSale';
import { Button } from '@/components/ui/Button';
import { BasicModal } from '@/components/ui/BasicModal';
import { SaleEditModal } from '@/app/(main)/marketplace/[saleId]/_components/SaleEditModal';

export const SellerButtons = ({ sale }) => {
  const { showToast } = useToastContext();

  const {
    mutate: updateSale,
    isPending,
    error: updateError,
    reset,
  } = useUpdateSale(sale.saleId);
  const { mutate: cancelSale } = useCancelSale();

  const router = useRouter();
  const isMobile = useIsMobile();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (isMobile) {
      router.prefetch(`/marketplace/${sale.saleId}/edit`);
    }
  }, [isMobile, sale.saleId, router]);

  const handleCancelSale = () => {
    cancelSale(sale.saleId, {
      onSuccess: () => {
        setShowCancelModal(false);
        showToast('포토카드 판매를 내렸습니다.');
      },
    });
  };

  const handlewEditSale = (formData) => {
    updateSale(formData, {
      onSuccess: () => setShowEditModal(false),
    });
  };

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
          onQuantityChange={reset}
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
