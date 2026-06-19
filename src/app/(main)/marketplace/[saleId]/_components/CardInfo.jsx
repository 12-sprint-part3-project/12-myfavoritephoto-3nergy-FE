import { GRADE_STYLE, GENRE } from '@/constants/card';

export const CardInfo = ({ sale }) => {
  return (
    <div className="flex w-full flex-col">
      {/* 등급, 장르, 판매자 닉네임 */}
      <div className="flex justify-between border-b border-gray-400 pb-[1.875rem] text-noto-18-bold lg:text-noto-24-bold">
        <div className="flex gap-[0.62rem] lg:gap-[0.9375rem]">
          <span className={GRADE_STYLE[sale.photocard.grade]?.textColor}>
            {GRADE_STYLE[sale.photocard.grade]?.label}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{GENRE[sale.photocard.genre]}</span>
        </div>
        <span className="border-b border-white text-white">
          {sale.seller.nickname}
        </span>
      </div>
      {/* 설명 */}
      <div className="border-b border-gray-400 py-[1.875rem]">
        <p className="white-space: pre-wrap text-noto-16-regular text-white lg:text-noto-18-regular">
          {sale.photocard.description}
        </p>
      </div>
      {/* 가격, 잔여 */}
      <div className="border-b border-gray-400 py-[1.875rem]">
        <div className="flex items-center justify-between pb-[0.62rem]">
          <span className="text-noto-18-regular text-gray-300 lg:text-noto-20-regular">
            가격
          </span>
          <span className="text-noto-20-bold text-white lg:text-noto-24-bold">
            {sale.price}P
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-noto-18-regular text-gray-300 lg:text-noto-20-regular">
            잔여
          </span>
          <div className="flex items-center gap-[0.3125rem]">
            <span className="text-noto-20-bold text-white lg:text-noto-24-bold">
              {sale.remainingQuantity}
            </span>
            <span className="text-noto-20-regular text-gray-300 lg:text-noto-24-regular">
              /{sale.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
