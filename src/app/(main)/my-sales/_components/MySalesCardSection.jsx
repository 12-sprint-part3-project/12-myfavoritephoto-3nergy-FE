'use client';

import { useState } from 'react';
import {
  CARD_GENRE_OPTIONS,
  CARD_GRADE_OPTIONS,
  SALE_METHOD_OPTIONS,
  SALE_STATUS_OPTIONS,
} from '@/constants/card';
import { usePageSize } from '@/hooks/common/usePageSize';
import { useMySales } from '@/hooks/sale/useMySales';
import { useMySalesFilterSelection } from '@/hooks/sale/useMySalesFilterSelection';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { CardList } from '@/app/(main)/my-sales/_components/CardList';
import { useDebounce } from '@/hooks/common/useDebounce';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { Spinner } from '@/components/ui/Spinner';
import { useDelayedLoading } from '@/hooks/common/useDelayedLoading';

export const MySalesCardSection = () => {
  const pageSize = usePageSize(); // 분기별 pageSize hook
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  /** NOTE: 실시간 검색으로 구현된 상태다보니 디바운싱 처리를 위해 넣어둠
   * 추후 submit 방식으로 바꾸는 것에 대해 고민
   */
  const debouncedKeyword = useDebounce(keyword, 500);
  const [filter, setFilter] = useState({
    grade: '',
    genre: '',
    saleMethod: '',
    isSoldOut: '',
  });
  const [open, setOpen] = useState(false);

  const { data, isFetching, isFetchingNextPage, isLoading } = useMySales({
    ...filter,
    keyword: debouncedKeyword,
    page,
    pageSize,
  });

  const {
    draftSelection,
    setDraftSelection,
    initialCounts,
    displayCount,
    isCountLoading,
  } = useMySalesFilterSelection(data);

  const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
  const genreOptions = [{ value: '', label: '전체' }, ...CARD_GENRE_OPTIONS];
  const methodOptions = [{ value: '', label: '전체' }, ...SALE_METHOD_OPTIONS];
  const isSoldOutOptions = [
    { value: '', label: '전체' },
    ...SALE_STATUS_OPTIONS.map(({ value, label }) => ({
      value: value === 'SOLD_OUT' ? 'true' : 'false',
      label,
    })),
  ];

  const isFiltered =
    !!debouncedKeyword ||
    !!filter.grade ||
    !!filter.genre ||
    !!filter.saleMethod ||
    filter.isSoldOut !== ''; // 필터 검색된 결과인지 체크

  const showFetchingSpinner = useDelayedLoading(
    isFetching && !isFetchingNextPage,
    300,
  );

  const handleFilterChange = (key) => (value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    // 필터 변경 시 결과 수가 달라져 현재 페이지가 범위를 벗어날 수 있으므로 1페이지로 초기화
    setPage(1);
  };

  return (
    <>
      <div className="mt-[15px] flex gap-[10px] md:mt-[20px] md:flex-row-reverse md:justify-end md:gap-[30px] lg:gap-[60px]">
        <div className="flex items-center md:gap-[25px] lg:gap-[45px]">
          <FilterDropdown
            label="등급"
            onChange={handleFilterChange('grade')}
            onMobileClick={() => setOpen((prev) => !prev)}
            options={gradeOptions}
            mobileButtonClassName="h-[2.8125rem] w-[2.8125rem]"
          />
          {open && (
            <MobileFilterBottomSheet
              tabs={['grade', 'genre', 'method', 'soldOut']}
              onClose={() => setOpen((prev) => !prev)}
              // draftSelection을 상위에서 관리해 선택 변경 시 displayCount 즉시 계산
              draftSelection={draftSelection}
              onDraftChange={setDraftSelection}
              totalPhotos={displayCount}
              onApply={(selection) => {
                setFilter({
                  grade: selection.grade ?? '',
                  genre: selection.genre ?? '',
                  saleMethod: selection.method ?? '',
                  isSoldOut:
                    selection.soldOut === 'SOLD_OUT'
                      ? true
                      : selection.soldOut === 'SALE'
                        ? false
                        : '',
                });
                setPage(1);
              }}
              isCountLoading={isCountLoading}
              counts={initialCounts}
              displayCount={displayCount}
            />
          )}

          <div className="hidden md:block">
            <FilterDropdown
              label="장르"
              onChange={handleFilterChange('genre')}
              onMobileClick={() => {}}
              options={genreOptions}
            />
          </div>
          <div className="hidden md:block">
            <FilterDropdown
              label="판매 방법"
              onChange={handleFilterChange('saleMethod')}
              onMobileClick={() => {}}
              options={methodOptions}
            />
          </div>
          <div className="hidden md:block">
            <FilterDropdown
              label="매진여부"
              onChange={handleFilterChange('isSoldOut')}
              onMobileClick={() => {}}
              options={isSoldOutOptions}
            />
          </div>
        </div>
        <div className="w-full md:w-[200px] lg:w-[320px]">
          <SearchBar
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[20rem] items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {showFetchingSpinner && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
              <Spinner />
            </div>
          )}

          <CardList sales={data.mySales} isFiltered={isFiltered} />

          {data.meta.totalPages && (
            <Pagination
              totalPages={data.meta.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
};
