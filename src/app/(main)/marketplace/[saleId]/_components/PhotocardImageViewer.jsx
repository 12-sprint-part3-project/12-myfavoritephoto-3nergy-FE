'use client';

import { useState } from 'react';
import Image from 'next/image';
import CloseIcon from '@/icons/close.svg';
import { SoldoutIcon } from '@/icons';
import { Overlay } from '@/components/ui/Overlay';

export const PhotocardImageViewer = ({ imageUrl, name, isSoldOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`${name} 원본 이미지 보기`}
        className="group relative mb-[1.25rem] h-[360px] w-full cursor-pointer overflow-hidden md:mr-[1.25rem] md:mb-0 md:aspect-[4/3] md:h-auto md:flex-1 lg:mr-[5rem]"
      >
        <Image
          src={imageUrl}
          alt={`${name} 사진`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw" // 100vw도 수정
          className={`object-cover transition-transform duration-300 group-hover:scale-105 md:object-contain ${isSoldOut ? 'opacity-30' : ''} `}
        />

        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-noto-12-regular text-white"
        >
          원본 보기
        </span>

        {isSoldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-[46.67%]">
              <SoldoutIcon className="h-auto w-full text-red" />
            </div>
          </div>
        )}
      </button>

      {isOpen && (
        <Overlay onClose={() => setIsOpen(false)}>
          {/* 화면 기준 닫기 버튼 */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="원본 이미지 닫기"
            className="absolute top-6 right-6 z-[60] cursor-pointer rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
          >
            <CloseIcon width={20} />
          </button>

          {/* 이미지 영역 */}
          <div className="relative h-[75vh] w-[80vw] max-w-[700px]">
            <Image
              src={imageUrl}
              alt={`${name} 원본 이미지`}
              fill
              className="object-contain"
              sizes="80vw"
            />
          </div>
        </Overlay>
      )}
    </>
  );
};
