'use client';

import { GRADE_STYLE } from '@/constants/card';
import SoldoutIcon from '@/icons/soldout.svg';
import Image from 'next/image';
import APP_NAME from '@/constants/app';

const STATUS_LABEL = {
  SALE: '판매 중',
  TRADE_PENDING: '교환 제시 대기 중',
  SOLD_OUT: '매진',
};

export const Card = ({
  type, // 'marketplace' | 'mysales' | 'mygallery'
  imageUrl,
  name,
  grade,
  genre,
  owner,
  price,
  remainingQuantity, // 잔여 수량 — marketplace/mysales
  totalQuantity, // 총 발행량 — marketplace
  quantity, // 보유 수량 — mygallery
  status, // 'SALE' | 'SOLD_OUT' — mysales, marketplace 공통 / 'TRADE_PENDING' - mysales 만
}) => {
  const { textColor, label: gradeLabel } = GRADE_STYLE[grade] ?? {};
  const isSoldOut = status === 'SOLD_OUT';

  return (
    <article className="flex flex-col bg-gray-500 p-[.625rem] md:p-5 md:pb-[1.875rem] lg:p-10">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className={`h-full w-full object-cover ${isSoldOut ? 'opacity-30' : ''}`}
        />
        {type === 'mysales' && !isSoldOut && (
          <span
            className={`md:text-noto-14-regular lg:text-noto-16-regular text-noto-10-regular absolute top-[.3125rem] left-[.3125rem] rounded-xs bg-black/50 px-2 py-1 md:top-[.625rem] md:left-[.625rem] lg:px-[.625rem] ${status === 'SALE' ? 'text-white' : 'text-main'}`}
          >
            {STATUS_LABEL[status]}
          </span>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[46.67%]">
              <SoldoutIcon className="text-red h-auto w-full" />
            </div>
            <span className="sr-only">{STATUS_LABEL[status]}</span>
          </div>
        )}
      </div>

      <div className="mt-[10px] md:mt-[25px] lg:mt-8">
        <h3 className="text-noto-14-bold md:text-noto-22-bold line-clamp-1 text-white">
          {name}
        </h3>

        <div className="mt-[5px] flex items-center justify-between md:mt-[10px]">
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
          <span className="text-noto-10-regular md:text-noto-16-regular pb-[2px] text-white underline md:pb-1">
            {owner}
          </span>
        </div>

        <dl className="mt-[10px] flex flex-col gap-[5px] border-t border-gray-400 pt-[10px] md:mt-5 md:gap-[10px] md:pt-5">
          <div className="flex justify-between">
            <dt className="text-noto-10-light md:text-noto-16-light text-gray-300">
              가격
            </dt>
            <dd className="text-noto-10-regular md:text-noto-18-regular text-white">
              {price} P
            </dd>
          </div>
          <div className="flex justify-between">
            {type === 'marketplace' && (
              <>
                <dt className="text-noto-10-light md:text-noto-16-light text-gray-300">
                  잔여
                </dt>
                <dd className="text-noto-10-light md:text-noto-18-light text-gray-300">
                  <span className="text-noto-10-regular md:text-noto-18-regular text-white">
                    {remainingQuantity}
                  </span>{' '}
                  / {totalQuantity}
                </dd>
              </>
            )}
            {type === 'mysales' && (
              <>
                <dt className="text-noto-10-light md:text-noto-16-light text-gray-300">
                  잔여
                </dt>
                <dd className="text-noto-10-regular md:text-noto-18-regular text-white">
                  {remainingQuantity}
                </dd>
              </>
            )}
            {type === 'mygallery' && (
              <>
                <dt className="text-noto-10-light md:text-noto-16-light text-gray-300">
                  수량
                </dt>
                <dd className="text-noto-10-regular md:text-noto-18-regular text-white">
                  {quantity}
                </dd>
              </>
            )}
          </div>
        </dl>
      </div>

      <div className="hidden md:mt-[44px] md:flex md:justify-center lg:mt-[47px]">
        <Image src="/logo.svg" alt={APP_NAME} width={100} height={18} />
      </div>
    </article>
  );
};
