export const EmptyPhotocardList = ({ isFiltered }) => {
  return (
    <div className="flex h-[20rem] flex-col items-center justify-center">
      <p className="text-noto-20-regular text-gray-300">
        {isFiltered
          ? '검색 결과가 없습니다.'
          : '판매 가능한 포토카드가 없습니다.'}
      </p>
      <p className="text-noto-16-regular mt-2 text-gray-300">
        {isFiltered
          ? '다른 검색어나 필터를 선택해보세요.'
          : '마이갤러리에서 포토카드를 생성해보세요.'}
      </p>
    </div>
  );
};
