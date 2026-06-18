export const ExchangeCardSkeleton = () => {
  return (
    <div className="flex flex-col border border-white/10 bg-gray-500 p-[.625rem] md:p-5 md:pb-[1.5625rem] lg:p-10">
      {/* 이미지 */}
      <div className="aspect-4/3 w-full animate-pulse bg-gray-400" />

      <div className="mt-[10px] md:mt-[25px] lg:mt-8">
        {/* 카드명 */}
        <div className="h-[1.125rem] w-[70%] animate-pulse rounded bg-gray-400 md:h-[1.625rem]" />

        {/* 등급/장르/가격/닉네임 */}
        <div className="mt-[5px] flex items-end justify-between md:mt-[10px]">
          <div className="flex flex-col gap-[5px] md:gap-[10px]">
            <div className="h-[0.75rem] w-[5rem] animate-pulse rounded bg-gray-400 md:h-[1rem] md:w-[8rem]" />
            <div className="h-[0.75rem] w-[4rem] animate-pulse rounded bg-gray-400 md:h-[1rem] md:w-[6rem]" />
          </div>
          <div className="h-[0.75rem] w-[3rem] animate-pulse rounded bg-gray-400 md:h-[1rem] md:w-[4rem]" />
        </div>

        {/* 설명 */}
        <div className="mt-[10px] border-t border-gray-400 pt-[10px] md:mt-5 md:pt-5">
          <div className="mb-1 h-[0.75rem] w-full animate-pulse rounded bg-gray-400 md:h-[1rem]" />
          <div className="h-[0.75rem] w-[80%] animate-pulse rounded bg-gray-400 md:h-[1rem]" />
        </div>

        {/* 버튼 */}
        <div className="mt-[29px] grid grid-cols-2 gap-[5px] md:mt-[43px] md:gap-5 lg:mt-[54px]">
          <div className="h-8 animate-pulse rounded bg-gray-400 md:h-10" />
          <div className="h-8 animate-pulse rounded bg-gray-400 md:h-10" />
        </div>
      </div>
    </div>
  );
};
