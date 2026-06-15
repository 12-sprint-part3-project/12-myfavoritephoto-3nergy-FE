'use client';

import { useState, useEffect, useRef } from 'react';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
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

const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
const genreOptions = [{ value: '', label: '전체' }, ...GENRE_OPTIONS];

const FILTER_TABS = ['grade', 'genre', 'method'];

const PAGE_SIZE = 18;

const BASE_CARDS = [
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
];

const EXTRA_OWNERS = [
  '랄스타',
  '랍스타',
  '프로여행러',
  '미쓰손',
  '콜렉터',
  '최애지킴이',
];
const EXTRA_METHODS = ['교환', '판매'];
const GRADE_VALUES = CARD_GRADE_OPTIONS.map((option) => option.value);
const GENRE_VALUES = Object.values(GENRE);

const EXTRA_CARDS = Array.from({ length: 30 }, (_, index) => {
  const id = BASE_CARDS.length + 1 + index;
  const totalQuantity = (index % 5) + 1;
  const remainingQuantity = index % 4 === 0 ? 0 : (index % totalQuantity) + 1;

  return {
    id,
    name: `목업 포토카드 ${id}`,
    grade: GRADE_VALUES[index % GRADE_VALUES.length],
    genre: GENRE_VALUES[index % GENRE_VALUES.length],
    owner: EXTRA_OWNERS[index % EXTRA_OWNERS.length],
    price: (index % 9) + 2,
    remainingQuantity,
    totalQuantity,
    status: remainingQuantity === 0 ? 'SOLD_OUT' : 'SALE',
    method: EXTRA_METHODS[index % EXTRA_METHODS.length],
  };
});

const MOCK_CARDS = [...BASE_CARDS, ...EXTRA_CARDS].map((card) => ({
  ...card,
  imageUrl: `https://picsum.photos/seed/photocard-${card.id}/400/400`,
}));

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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const observerTargetRef = useRef(null);

  const handleFilterChange = (key) => (value) => {
    setFilters((prev) => ({ ...prev, [key]: value === '' ? null : value }));
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setVisibleCount(PAGE_SIZE);
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

  const visibleCards = sortedCards.slice(0, visibleCount);
  const hasMore = visibleCount < sortedCards.length;

  useEffect(() => {
    if (!hasMore) return;

    const target = observerTargetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCount((prev) =>
          Math.min(prev + PAGE_SIZE, sortedCards.length),
        );
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, sortedCards.length]);

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
              options={gradeOptions}
              value={filters.grade}
              onChange={handleFilterChange('grade')}
              onMobileClick={() => setIsFilterOpen(true)}
            />
            <div className="hidden md:block">
              <FilterDropdown
                label="장르"
                options={genreOptions}
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
            onChange={handleSortChange}
            className="w-[8.75rem] shrink-0 md:w-[11.25rem]"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-[5px] md:mt-[1.875rem] md:gap-[20px] lg:grid-cols-3 lg:gap-[80px]">
        {visibleCards.map((card) => (
          <Card key={card.id} type="marketplace" {...card} />
        ))}
      </div>

      {hasMore && <div ref={observerTargetRef} className="h-1" />}

      {isFilterOpen && (
        <MobileFilterBottomSheet
          tabs={FILTER_TABS}
          counts={FILTER_COUNTS}
          totalPhotos={MOCK_CARDS.length}
          onClose={() => setIsFilterOpen(false)}
          onApply={(selection) => {
            setFilters((prev) => ({ ...prev, ...selection }));
            setVisibleCount(PAGE_SIZE);
          }}
        />
      )}

      <div className="fixed inset-x-0 bottom-0 z-10 bg-black p-[0.9375rem] md:hidden">
        <CreateSaleButton />
      </div>
    </div>
  );
};
