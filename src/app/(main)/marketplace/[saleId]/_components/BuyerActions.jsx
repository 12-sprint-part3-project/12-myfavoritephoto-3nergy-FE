'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CounterInput } from '@/components/ui/CounterInput';
import { BasicModal } from '@/components/ui/BasicModal';

export const BuyerActions = ({ sale }) => {
  const [value, setValue] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePurchase = () => {
    setShowConfirmModal(false);
    // TODO: 구매 API 연동
  };

  const totalPrice = value * sale.price;

  return (
    <div className="mt-[1.875rem] flex flex-col">
      {/* 구매 수량 + 총 가격 */}
      <div className="flex flex-col gap-[1.25rem]">
        <CounterInput
          label="구매 수량"
          labelClassName="text-noto-18-regular lg:text-noto-20-regular"
          value={value}
          onChange={setValue}
          min={1}
          max={sale.remainingQuantity}
        />
        <div className="flex justify-between">
          <span className="text-noto-18-regular lg:text-noto-20-regular text-white">
            총 가격
          </span>
          <span className="flex items-end gap-[0.62rem]">
            <span className="text-noto-20-bold lg:text-noto-24-bold text-white">
              {totalPrice.toLocaleString()}P
            </span>
            <span className="text-noto-18-regular lg:text-noto-20-regular text-gray-300">
              ({sale.remainingQuantity}장)
            </span>
          </span>
        </div>
      </div>

      {/* 구매 버튼 */}
      <div className="mt-10 lg:mt-[5rem]">
        <Button
          size="thick"
          className="text-noto-18-bold lg:text-noto-20-bold w-full"
          onClick={() => setShowConfirmModal(true)}
        >
          포토카드 구매하기
        </Button>
      </div>

      {showConfirmModal && (
        <BasicModal
          title="포토카드 구매"
          buttonText="구매하기"
          onClose={() => setShowConfirmModal(false)}
          onClick={handlePurchase}
        >
          [{sale.photocard.grade} | {sale.photocard.name}] {value}장을
          구매하시겠습니까?
        </BasicModal>
      )}
    </div>
  );
};
