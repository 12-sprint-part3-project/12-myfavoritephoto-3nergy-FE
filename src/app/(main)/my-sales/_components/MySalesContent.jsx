'use client';

import { useState } from 'react';
import { useMe } from '@/hooks/user/useMe';
import { useMySales } from '@/hooks/sale/useMySales';
import { usePageSize } from '@/hooks/common/usePageSize';
import { useDebounce } from '@/hooks/common/useDebounce';
import { Spinner } from '@/components/ui/Spinner';
import { PageTitle } from '@/components/layout/PageTitle';
import GradeBadgeList from '@/components/domain/photocard/GradeBadgeList';
import { OwnedCardsInfo } from '@/app/(main)/my-sales/_components/OwnedCardsInfo';
import { MySalesCardSection } from '@/app/(main)/my-sales/_components/MySalesCardSection';

export const MySalesContent = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState({
    grade: '',
    genre: '',
    saleMethod: '',
    isSoldOut: '',
  });

  const pageSize = usePageSize();
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data: me } = useMe();
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
  } = useMySales();
  const {
    data,
    isLoading: listLoading,
    error: listError,
  } = useMySales({ keyword: debouncedKeyword, ...filter, page, pageSize });

  // TODO: 에러 컴포넌트로 교체
  if (summaryError || listError) {
    return <div className="text-white">에러가 발생했습니다.</div>;
  }

  return (
    <div className="px-[0.9375rem] pt-[1.25rem] pb-[40px] md:px-[1.25rem] md:pt-[2.5rem] md:pb-[110px] xl:pt-[3.75rem] xl:pb-[140px]">
      <PageTitle title="나의 판매 포토카드" variant="title-lg" />

      {
        // TODO: 스켈레톤 UI로 교체
        summaryLoading || listLoading ? (
          <div className="flex items-center justify-center py-[3.125rem]">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="border-b border-gray-400 py-[40px]">
              <OwnedCardsInfo
                nickname={me?.nickname}
                allCardsCnt={summaryData.meta.totalCount}
              />
              <GradeBadgeList grades={summaryData.data.gradeCounts} />
            </div>

            <MySalesCardSection
              data={data}
              onFilterChange={setFilter}
              page={page}
              onPageChange={setPage}
              keyword={keyword}
              onKeywordChange={setKeyword}
            />
          </>
        )
      }
    </div>
  );
};
