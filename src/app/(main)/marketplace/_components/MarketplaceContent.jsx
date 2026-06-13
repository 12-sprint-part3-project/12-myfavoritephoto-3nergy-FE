'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/domain/photocard/Card';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { SortDropdown } from '@/components/domain/photocard/SortDropdown';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { CreateSaleButton } from '@/app/(main)/marketplace/_components/CreateSaleButton';
import { CARD_GRADE_OPTIONS, GENRE } from '@/constants/card';

const GENRE_OPTIONS = Object.values(GENRE).map((label) => ({
  value: label,
  label,
}));

const METHOD_OPTIONS = [
  { value: '교환', label: '교환' },
  { value: '판매', label: '판매' },
];

const FILTER_TABS = ['grade', 'genre', 'method'];

const PAGE_SIZE = 18;

// 목업 데이터 — API 연동 전까지 임시 사용
const MOCK_CARDS = [
  {
    id: 1,
    name: '우리집 앞마당',
    grade: 'rare',
    genre: GENRE.landscape,
    owner: '랄스타',
    price: 4,
    remainingQuantity: 0,
    totalQuantity: 5,
    status: 'SOLD_OUT',
    method: '판매',
  },
  {
    id: 2,
    name: "How Far I'll Go",
    grade: 'common',
    genre: GENRE.landscape,
    owner: '랍스타',
    price: 4,
    remainingQuantity: 2,
    totalQuantity: 5,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 3,
    name: '스페인 여행',
    grade: 'super_rare',
    genre: GENRE.special,
    owner: '프로여행러',
    price: 4,
    remainingQuantity: 2,
    totalQuantity: 5,
    status: 'SALE',
    method: '판매',
  },
  {
    id: 4,
    name: '첫 만남의 순간',
    grade: 'legendary',
    genre: GENRE.album,
    owner: '미쓰손',
    price: 6,
    remainingQuantity: 1,
    totalQuantity: 3,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 5,
    name: '무대 위의 빛',
    grade: 'rare',
    genre: GENRE.concert,
    owner: '콜렉터',
    price: 8,
    remainingQuantity: 0,
    totalQuantity: 4,
    status: 'SOLD_OUT',
    method: '판매',
  },
  {
    id: 6,
    name: '시즌그리팅 세트',
    grade: 'common',
    genre: GENRE.season_greeting,
    owner: '최애지킴이',
    price: 3,
    remainingQuantity: 5,
    totalQuantity: 5,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 7,
    name: '콘서트 직캠',
    grade: 'super_rare',
    genre: GENRE.concert,
    owner: '랄스타',
    price: 9,
    remainingQuantity: 1,
    totalQuantity: 2,
    status: 'SALE',
    method: '판매',
  },
  {
    id: 8,
    name: '우리 팬미팅',
    grade: 'legendary',
    genre: GENRE.fan_meeting,
    owner: '랍스타',
    price: 10,
    remainingQuantity: 0,
    totalQuantity: 2,
    status: 'SOLD_OUT',
    method: '교환',
  },
  {
    id: 9,
    name: '데뷔 앨범 포카',
    grade: 'rare',
    genre: GENRE.album,
    owner: '프로여행러',
    price: 5,
    remainingQuantity: 3,
    totalQuantity: 5,
    status: 'SALE',
    method: '판매',
  },
  {
    id: 10,
    name: '굿즈 콜라보 MD',
    grade: 'common',
    genre: GENRE.md,
    owner: '미쓰손',
    price: 2,
    remainingQuantity: 4,
    totalQuantity: 5,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 11,
    name: '브랜드 화보',
    grade: 'super_rare',
    genre: GENRE.branding,
    owner: '콜렉터',
    price: 7,
    remainingQuantity: 2,
    totalQuantity: 5,
    status: 'SALE',
    method: '판매',
  },
  {
    id: 12,
    name: '콜라주 에디션',
    grade: 'legendary',
    genre: GENRE.collage,
    owner: '최애지킴이',
    price: 9,
    remainingQuantity: 1,
    totalQuantity: 3,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 13,
    name: '서울의 밤',
    grade: 'rare',
    genre: GENRE.landscape,
    owner: '랄스타',
    price: 4,
    remainingQuantity: 0,
    totalQuantity: 4,
    status: 'SOLD_OUT',
    method: '판매',
  },
  {
    id: 14,
    name: '벚꽃 데이트',
    grade: 'common',
    genre: GENRE.etc,
    owner: '랍스타',
    price: 3,
    remainingQuantity: 5,
    totalQuantity: 5,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 15,
    name: '연습실 비하인드',
    grade: 'super_rare',
    genre: GENRE.special,
    owner: '프로여행러',
    price: 8,
    remainingQuantity: 1,
    totalQuantity: 2,
    status: 'SALE',
    method: '판매',
  },
  {
    id: 16,
    name: '첫 단독 콘서트',
    grade: 'legendary',
    genre: GENRE.concert,
    owner: '미쓰손',
    price: 10,
    remainingQuantity: 2,
    totalQuantity: 3,
    status: 'SALE',
    method: '교환',
  },
  {
    id: 17,
    name: '팬사인회 스케치',
    grade: 'rare',
    genre: GENRE.fan_meeting,
    owner: '콜렉터',
    price: 5,
    remainingQuantity: 3,
    totalQuantity: 5,
    status: 'SALE',
    method: '판매',
  },
  {
    id: 18,
    name: '우리의 여름',
    grade: 'common',
    genre: GENRE.album,
    owner: '최애지킴이',
    price: 4,
    remainingQuantity: 4,
    totalQuantity: 5,
    status: 'SALE',
    method: '교환',
  },
].map((card) => ({
  ...card,
  imageUrl: `https://picsum.photos/seed/photocard-${card.id}/400/400`,
}));

// 필터별 전체 카드 기준 개수 (선택 안내용 — API 연동 전까지 단순 합산 값)
const countByOption = (cards, key, options) =>
  options.reduce((acc, { value }) => {
    acc[value] = cards.filter((card) => card[key] === value).length;
    return acc;
  }, {});

const FILTER_COUNTS = {
  grade: countByOption(MOCK_CARDS, 'grade', CARD_GRADE_OPTIONS),
  genre: countByOption(MOCK_CARDS, 'genre', GENRE_OPTIONS),
  method: countByOption(MOCK_CARDS, 'method', METHOD_OPTIONS),
};

export const MarketplaceContent = () => {
  const [filters, setFilters] = useState({
    grade: null,
    genre: null,
    method: null,
  });
  const [sort, setSort] = useState('low-price');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleFilterChange = (key) => (value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
  };

  const filteredCards = MOCK_CARDS.filter((card) => {
    if (filters.grade && card.grade !== filters.grade) return false;
    if (filters.genre && card.genre !== filters.genre) return false;
    if (filters.method && card.method !== filters.method) return false;
    if (
      searchKeyword &&
      !card.name.toLowerCase().includes(searchKeyword.trim().toLowerCase())
    )
      return false;
    return true;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sort === 'high-price') return b.price - a.price;
    if (sort === 'latest') return b.id - a.id;
    return a.price - b.price; // low-price (기본값)
  });

  const totalPages = Math.max(1, Math.ceil(sortedCards.length / PAGE_SIZE));
  const pagedCards = sortedCards.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="pb-[5.5rem] md:pb-[110px] xl:pb-[140px]">
      <PageTitle
        variant="title-lg"
        title="마켓플레이스"
        actions={
          <div className="hidden md:inline-flex">
            <CreateSaleButton />
          </div>
        }
      />

      <div className="mt-5 flex flex-col gap-3 md:mt-[1.875rem] md:flex-row md:items-center md:gap-6 lg:gap-[3.75rem]">
        <div className="md:w-[20rem]">
          <SearchBar value={searchKeyword} onChange={handleSearchChange} />
        </div>

        <div className="flex items-center justify-between gap-3 md:flex-1 md:gap-6">
          <div className="flex items-center gap-3 md:gap-6 lg:gap-[2.8125rem]">
            <FilterDropdown
              label="등급"
              options={CARD_GRADE_OPTIONS}
              value={filters.grade}
              onChange={handleFilterChange('grade')}
              onMobileClick={() => setIsFilterOpen(true)}
            />
            <div className="hidden md:block">
              <FilterDropdown
                label="장르"
                options={GENRE_OPTIONS}
                value={filters.genre}
                onChange={handleFilterChange('genre')}
              />
            </div>
            <div className="hidden md:block">
              <FilterDropdown
                label="판매방법"
                options={METHOD_OPTIONS}
                value={filters.method}
                onChange={handleFilterChange('method')}
              />
            </div>
          </div>

          <SortDropdown
            value={sort}
            onChange={setSort}
            className="w-[8.75rem] shrink-0 md:w-[11.25rem]"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-[5px] md:mt-[1.875rem] md:gap-[20px] lg:grid-cols-3 lg:gap-[80px]">
        {pagedCards.map((card) => (
          <Card key={card.id} type="marketplace" {...card} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isFilterOpen && (
        <MobileFilterBottomSheet
          tabs={FILTER_TABS}
          counts={FILTER_COUNTS}
          totalPhotos={MOCK_CARDS.length}
          onClose={() => setIsFilterOpen(false)}
          onApply={(selection) => {
            setFilters((prev) => ({ ...prev, ...selection }));
            setCurrentPage(1);
          }}
        />
      )}

      <div className="fixed inset-x-0 bottom-0 z-10 bg-black p-[0.9375rem] md:hidden">
        <CreateSaleButton />
      </div>
    </div>
  );
};
