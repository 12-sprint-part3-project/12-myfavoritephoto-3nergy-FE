export const OwnedCardsInfo = ({ nickname, allCardsCnt }) => {
  return (
    <div className="mb-[15px] flex items-center gap-[5px] md:mb-[20px] md:gap-[10px]">
      <span className="lg:text-noto-24-bold md:text-noto-20-bold text-noto-24-bold text-gray-200">
        {nickname}이 보유한 포토카드
      </span>
      <span className="text-noto-12-regular lg:text-noto-20-regular md:text-noto-18-regular text-gray-300">
        ({allCardsCnt}장)
      </span>
    </div>
  );
};
