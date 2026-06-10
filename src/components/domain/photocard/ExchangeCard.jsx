'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GRADE_STYLE } from '@/constants/card';
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
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  const handleReject = () => {
    setIsRejectModalOpen(false);
    if (onReject) onReject();
  };

  const handleAccept = () => {
    setIsAcceptModalOpen(false);
    if (onAccept) onAccept();
  };

  const { textColor, label: gradeLabel } = GRADE_STYLE[grade] ?? {};

  return (
    <>
      <article className="flex flex-col bg-gray-500 p-[.625rem] md:p-5 md:pb-[1.5625rem] lg:p-10">
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
          <h3 className="text-noto-14-bold md:text-noto-22-bold line-clamp-1 text-white">
            {name}
          </h3>

          <div className="mt-[5px] flex items-end justify-between md:mt-[10px]">
            <div className="flex flex-col flex-wrap gap-[5px] md:gap-[10px] lg:flex-row lg:gap-0">
              <div className="flex items-center">
                <span
                  className={`text-noto-10-light md:text-noto-16-light pb-[2px] md:pb-1 ${textColor}`}
                >
                  {gradeLabel}
                </span>
                <span className="text-noto-10-regular md:text-noto-16-regular pb-[2px] text-gray-300 before:mx-[5px] before:text-gray-400 before:content-['|'] md:pb-1 before:md:mx-[10px]">
                  {genre}
                </span>
              </div>
              <span className="text-noto-10-regular md:text-noto-16-regular pb-[2px] text-gray-300 before:mx-[5px] before:hidden before:text-gray-400 before:content-['|'] md:pb-1 before:lg:mx-[10px] before:lg:inline-block">
                <span className="text-white">{price} P</span> 에 구매
              </span>
            </div>
            <span className="text-noto-10-regular md:text-noto-16-regular shrink-0 pb-[2px] text-white underline md:pb-1">
              {owner}
            </span>
          </div>

          <div className="mt-[10px] border-t border-gray-400 pt-[10px] md:mt-5 md:pt-5">
            <p className="text-noto-10-regular md:text-noto-16-regular line-clamp-2 min-h-[2lh] text-white">
              {description}
            </p>
          </div>

          <div className="mt-[29px] grid grid-cols-2 gap-[5px] md:mt-[43px] md:gap-5 lg:mt-[54px]">
            <Button
              variant="secondary"
              size="sm"
              className="text-noto-12-bold md:text-noto-16-medium lg:text-noto-18-bold"
              onClick={() => setIsRejectModalOpen(true)}
            >
              거절<span className="hidden md:inline">하기</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="text-noto-12-bold md:text-noto-16-medium lg:text-noto-18-bold"
              onClick={() => setIsAcceptModalOpen(true)}
            >
              승인<span className="hidden md:inline">하기</span>
            </Button>
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
    </>
  );
};
