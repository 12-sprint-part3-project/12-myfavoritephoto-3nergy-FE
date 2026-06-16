'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GRADE_STYLE, GENRE } from '@/constants/card';
import { Button } from '@/components/ui/Button';
import { BasicModal } from '@/components/ui/BasicModal';

export const ExchangeCard = ({
  imageUrl,
  name,
  grade,
  genre,
  owner,
  price,
  description,
  onAccept,
  onReject,
  variant = 'seller', // 'seller' | 'buyer'
  onCancel,
  isPending = false,
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleReject = () => {
    setIsRejectModalOpen(false);
    if (onReject) onReject();
  };

  const handleAccept = () => {
    setIsAcceptModalOpen(false);
    if (onAccept) onAccept();
  };

  const handleCancel = () => {
    if (onCancel) onCancel(() => setIsCancelModalOpen(false));
  };

  const { textColor, label: gradeLabel } = GRADE_STYLE[grade] ?? {};

  return (
    <>
      <article className="flex flex-col border border-white/10 bg-gray-500 p-[.625rem] md:p-5 md:pb-[1.5625rem] lg:p-10">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-[10px] md:mt-[25px] lg:mt-8">
          <h3 className="line-clamp-1 text-noto-14-bold text-white md:text-noto-22-bold">
            {name}
          </h3>

          <div className="mt-[5px] flex items-end justify-between md:mt-[10px]">
            <div className="flex flex-col flex-wrap gap-[5px] md:gap-[10px] lg:flex-row lg:gap-0">
              <div className="flex items-center">
                <span
                  className={`pb-[2px] text-noto-10-light md:pb-1 md:text-noto-16-light ${textColor}`}
                >
                  {gradeLabel}
                </span>
                <span className="pb-[2px] text-noto-10-regular text-gray-300 before:mx-[5px] before:text-gray-400 before:content-['|'] md:pb-1 md:text-noto-16-regular before:md:mx-[10px]">
                  {GENRE[genre]}
                </span>
              </div>
              <span className="pb-[2px] text-noto-10-regular text-gray-300 before:mx-[5px] before:hidden before:text-gray-400 before:content-['|'] md:pb-1 md:text-noto-16-regular before:lg:mx-[10px] before:lg:inline-block">
                <span className="text-white">{price} P</span> 에 구매
              </span>
            </div>
            <span className="shrink-0 pb-[2px] text-noto-10-regular text-white underline md:pb-1 md:text-noto-16-regular">
              {owner}
            </span>
          </div>

          <div className="mt-[10px] border-t border-gray-400 pt-[10px] md:mt-5 md:pt-5">
            <p className="line-clamp-2 min-h-[2lh] text-noto-10-regular text-white md:text-noto-16-regular">
              {description}
            </p>
          </div>

          <div className="mt-[29px] grid grid-cols-2 gap-[5px] md:mt-[43px] md:gap-5 lg:mt-[54px]">
            {variant === 'seller' ? (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="md:text-noto-16-medium text-noto-12-bold lg:text-noto-18-bold"
                  onClick={() => setIsRejectModalOpen(true)}
                >
                  거절<span className="hidden md:inline">하기</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="md:text-noto-16-medium text-noto-12-bold lg:text-noto-18-bold"
                  onClick={() => setIsAcceptModalOpen(true)}
                >
                  승인<span className="hidden md:inline">하기</span>
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                className="col-span-2"
                onClick={() => setIsCancelModalOpen(true)}
              >
                취소하기
              </Button>
            )}
          </div>
        </div>
      </article>

      {isRejectModalOpen && (
        <BasicModal
          title="교환 제시 거절"
          buttonText="거절하기"
          onClose={() => setIsRejectModalOpen(false)}
          onClick={handleReject}
        >
          [{gradeLabel} | {name}] 카드와의 교환을 거절하시겠습니까?
        </BasicModal>
      )}

      {isAcceptModalOpen && (
        <BasicModal
          title="교환 제시 승인"
          buttonText="승인하기"
          onClose={() => setIsAcceptModalOpen(false)}
          onClick={handleAccept}
        >
          [{gradeLabel} | {name}] 카드와의 교환을 승인하시겠습니까?
        </BasicModal>
      )}

      {isCancelModalOpen && (
        <BasicModal
          title="교환 제시 취소"
          buttonText="취소하기"
          loadingText="취소 중..."
          onClose={() => setIsCancelModalOpen(false)}
          onClick={handleCancel}
          isLoading={isPending}
        >
          [{gradeLabel} | {name}] 교환 제시를 취소하시겠습니까?
        </BasicModal>
      )}
    </>
  );
};
