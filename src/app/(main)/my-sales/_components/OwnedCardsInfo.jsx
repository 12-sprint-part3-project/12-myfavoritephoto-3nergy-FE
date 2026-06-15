export const OwnedCardsInfo = ({ nickname, allCardsCnt }) => {
  return (
    <div className="mb-[15px] flex items-center gap-[5px] md:mb-[20px] md:gap-[10px]">
      <span className="text-noto-14-bold text-gray-200 md:text-noto-20-bold lg:text-noto-24-bold">
        {nickname}님이 보유한 포토카드
      </span>
      <span className="text-noto-12-regular text-gray-300 md:text-noto-18-regular lg:text-noto-20-regular">
        ({allCardsCnt}장)
      </span>
    </div>
  );
};
