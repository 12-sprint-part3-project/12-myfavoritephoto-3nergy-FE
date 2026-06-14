import Image from 'next/image';
import { GRADE_STYLE } from '@/constants/card';

export const PhotocardFormLayout = ({
  imageUrl,
  name,
  grade,
  genre,
  nickname,
  children,
}) => {
  return (
    <div className="mb-[7.5rem] flex flex-col md:mb-[3.84rem] md:flex-row lg:mb-[3.47rem]">
      {/* 포토카드 사진 */}
      <div className="mb-[1.2rem] md:mr-[1.25rem] md:mb-0 md:flex-1 lg:mr-[2.5rem]">
        <Image
          src={imageUrl}
          alt={`${name} 사진`}
          width={0}
          height={0}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
      <div className="flex flex-1 flex-col">
        {/* 등급, 장르, 판매자 닉네임 */}
        <div className="text-noto-18-bold lg:text-noto-24-bold mb-[1.875rem] flex justify-between border-b border-gray-400 pb-[1.875rem]">
          <div className="flex gap-[0.62rem] lg:gap-[0.9375rem]">
            <span className={GRADE_STYLE[grade]?.textColor}>
              {GRADE_STYLE[grade]?.label}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{genre}</span>
          </div>
          <span className="border-b border-white text-white">{nickname}</span>
        </div>
        {/* 수량/가격: 각 폼에서 주입 */}
        <div className="flex flex-col gap-[1.25rem]">{children}</div>
      </div>
    </div>
  );
};
