'use client';

import { useEffect, useState } from 'react';
import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from '@/constants/card';
import { usePhotocards } from '@/hooks/photocard/usePhotocards';
import { usePageSize } from '@/hooks/common/usePageSize';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { CardList } from '@/app/(main)/my-gallery/_components/CardList';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { useDebounce } from '@/hooks/common/useDebounce';

export const MyGalleryCardSection = () => {
  const pageSize = usePageSize(); // 분기별 pageSize 불러올 hook
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  /** NOTE: 실시간 검색으로 구현된 상태다보니 디바운싱 처리를 위해 넣어둠
   * 추후 submit 방식으로 바꾸는 것에 대해 고민
   */
  const debouncedKeyword = useDebounce(keyword, 500);
  const [filter, setFilter] = useState({ grade: '', genre: '' });
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = usePhotocards({
    keyword: debouncedKeyword,
    ...filter,
    page,
    pageSize,
  });

  const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
  const genreOptions = [{ value: '', label: '전체' }, ...CARD_GENRE_OPTIONS];

  const handleFilterChange = (key) => (value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    // 필터 변경 시 결과 수가 달라져 현재 페이지가 범위를 벗어날 수 있으므로 1페이지로 초기화
    setPage(1);
  };

  const allCardsCnt = data?.meta.totalCount; // 총 보유 카드 수량

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
              tabs={['grade', 'genre']}
              onClose={() => setOpen((prev) => !prev)}
              onApply={(selection) => setFilter(selection)}
              initialSelection={filter}
              totalPhotos={allCardsCnt}
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
        </div>
        <div className="w-full md:w-[200px] lg:w-[320px]">
          <SearchBar
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
        </div>
      </div>

      {/* TODO: 스켈레톤 UI로 교체 */}
      {isLoading && <div className="text-white">로딩 중...</div>}

      {/* TODO: 에러 컴포넌트로 교체 */}
      {error && <div className="text-white">에러가 발생했습니다.</div>}

      {!isLoading && !error && data && (
        <>
          <CardList photocards={data.data.photocards} />
          <Pagination
            totalPages={data.meta.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};
