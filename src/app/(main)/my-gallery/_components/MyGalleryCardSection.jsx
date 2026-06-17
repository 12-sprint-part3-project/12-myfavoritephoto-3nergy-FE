'use client';

import { useState } from 'react';
import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from '@/constants/card';
import { usePhotocardFilterSelection } from '@/hooks/photocard/usePhotocardFilterSelection';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { CardList } from '@/app/(main)/my-gallery/_components/CardList';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';

export const MyGalleryCardSection = ({
  data,
  onFilterChange,
  page,
  onPageChange,
  keyword,
  onKeywordChange,
}) => {
  const [open, setOpen] = useState(false);

  const {
    draftSelection,
    setDraftSelection,
    initialCounts,
    displayCount,
    isCountLoading,
  } = usePhotocardFilterSelection(data);

  const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
  const genreOptions = [{ value: '', label: '전체' }, ...CARD_GENRE_OPTIONS];

  const handleFilterChange = (key) => (value) => {
    onFilterChange((prev) => ({ ...prev, [key]: value }));
    // 필터 변경 시 결과 수가 달라져 현재 페이지가 범위를 벗어날 수 있으므로 1페이지로 초기화
    onPageChange(1);
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
              tabs={['grade', 'genre']}
              onClose={() => setOpen((prev) => !prev)}
              draftSelection={draftSelection}
              onDraftChange={setDraftSelection}
              totalPhotos={displayCount}
              onApply={(selection) => {
                onFilterChange({
                  grade: selection.grade ?? '',
                  genre: selection.genre ?? '',
                });
                onPageChange(1);
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
        </div>
        <div className="w-full md:w-[200px] lg:w-[320px]">
          <SearchBar
            value={keyword}
            onChange={(e) => onKeywordChange(e.currentTarget.value)}
          />
        </div>
      </div>

      {data && (
        <>
          <CardList photocards={data.photocards} />
          <Pagination
            totalPages={data.meta.totalPages}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </>
      )}
    </>
  );
};
