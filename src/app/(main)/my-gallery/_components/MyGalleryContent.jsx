'use client';

import { useState } from 'react';
import { usePhotocards } from '@/hooks/photocard/usePhotocards';
import { useMe } from '@/hooks/user/useMe';
import { Pagination } from '@/components/ui/Pagination';
import { SearchBar } from '@/components/ui/SearchBar';
import GradeBadgeList from '@/components/domain/photocard/GradeBadgeList';
import { CardList } from './CardList';
import { OwnedCardsInfo } from './OwnedCardsInfo';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { CARD_GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/card';

export const MyGalleryContent = () => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState({ grade: '', genre: '' });
  const { data, isLoading, error } = usePhotocards({ keyword, ...filter });
  const { data: me } = useMe();

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) return <div className="text-white">로딩 중...</div>;

  // TODO: 에러 컴포넌트로 교체
  if (error) return <div className="text-white">에러가 발생했습니다.</div>;

  const { gradeCounts: grades, photocards } = data.data;
  const { totalPages, page: currentPage, pageSize } = data.meta;
  const allCardsCnt = grades.reduce((acc, g) => acc + g.count, 0); // 발행된 카드의 총 수량
  const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
  const genreOptions = [{ value: '', label: '전체' }, ...GENRE_OPTIONS];

  const handleFilterChange = (key) => (value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  // console.log(data);

  return (
    <>
      <div className="border-b border-gray-400 py-[40px]">
        <OwnedCardsInfo nickname={me.nickname} allCardsCnt={allCardsCnt} />

        <GradeBadgeList grades={grades} />
      </div>

      <div className="mt-[15px] flex gap-[10px] md:mt-[20px] md:flex-row-reverse md:justify-end md:gap-[30px] lg:gap-[60px]">
        <div className="flex items-center md:gap-[25px] lg:gap-[45px]">
          <FilterDropdown
            label="등급"
            onChange={handleFilterChange('grade')}
            onMobileClick={() => {}}
            options={gradeOptions}
          />
          <FilterDropdown
            label="장르"
            onChange={handleFilterChange('genre')}
            onMobileClick={() => {}}
            options={genreOptions}
          />
        </div>
        <div className="w-full md:w-[200px] lg:w-[320px]">
          <SearchBar
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
        </div>
      </div>

      <CardList photocards={photocards} />

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};
