export const EmptyPhotocardList = ({
  isFiltered,
  emptyTitle,
  emptyDescription,
}) => {
  const title = isFiltered ? '검색 결과가 없습니다.' : emptyTitle;

  const description = isFiltered
    ? '다른 검색어나 필터를 선택해보세요.'
    : emptyDescription;

  return (
    <div className="flex h-[20rem] flex-col items-center justify-center">
      <p className="text-noto-20-regular text-gray-300">{title}</p>
      <p className="text-noto-16-regular mt-2 text-gray-300">{description}</p>
    </div>
  );
};
