'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/domain/photocard/Card';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { SortDropdown } from '@/components/domain/photocard/SortDropdown';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';
import { CreateSaleModal } from '@/app/(main)/marketplace/_components/CreateSaleModal';
import { useSales } from '@/hooks/sale/useSales';
import { useSalesFilterSelection } from '@/hooks/sale/useSalesFilterSelection';
import { useIsMobile } from '@/hooks/common/useResponsive';
import { usePageSize } from '@/hooks/common/usePageSize';
import { useDebounce } from '@/hooks/common/useDebounce';
import {
  CARD_GRADE_OPTIONS,
  CARD_GENRE_OPTIONS,
  SALE_STATUS_OPTIONS,
} from '@/constants/card';

const GRADE_OPTIONS = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
const GENRE_OPTIONS = [{ value: '', label: '전체' }, ...CARD_GENRE_OPTIONS];
const SOLD_OUT_OPTIONS = [{ value: '', label: '전체' }, ...SALE_STATUS_OPTIONS];

const FILTER_TABS = ['grade', 'genre', 'soldOut'];

// SortDropdown 옵션 값 → API sort 파라미터 값
const SORT_PARAM_MAP = {
  'low-price': 'price_asc',
  'high-price': 'price_desc',
  latest: 'latest',
};

// 판매 목록 응답을 Card 컴포넌트 props로 매핑
const mapSaleToCard = (sale) => ({
  id: sale.saleId,
  imageUrl: sale.photocard.imageUrl,
  name: sale.photocard.name,
  grade: sale.photocard.grade,
  genre: sale.photocard.genre,
  owner: sale.seller.nickname,
  price: sale.price,
  remainingQuantity: sale.remainingQuantity,
  totalQuantity: sale.quantity,
  status: sale.status,
});

export const MarketplaceContent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const pageSize = usePageSize();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    grade: null,
    genre: null,
    soldOut: null,
  });
  const [sort, setSort] = useState('low-price');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedKeyword = useDebounce(searchKeyword, 500);
  const observerTargetRef = useRef(null);

  const handleCreateClick = () => {
    if (isMobile) {
      router.push('/marketplace/create');
    } else {
      setShowCreateModal(true);
    }
  };

  const handleFilterChange = (key) => (value) => {
    setFilters((prev) => ({ ...prev, [key]: value === '' ? null : value }));
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSales({
      keyword: debouncedKeyword.trim(),
      grade: filters.grade,
      genre: filters.genre,
      status: filters.soldOut,
      sort: SORT_PARAM_MAP[sort],
      pageSize,
    });

  const {
    draftSelection,
    setDraftSelection,
    initialCounts,
    displayCount,
    isCountLoading,
  } = useSalesFilterSelection(data);

  const cards = data?.sales.map(mapSaleToCard) ?? [];
  const totalCount = data?.meta.totalCount ?? 0;
  const isFiltered = Boolean(
    searchKeyword.trim() || filters.grade || filters.genre || filters.soldOut,
  );

  useEffect(() => {
    if (!hasNextPage) return;

    const target = observerTargetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="pb-[5.5rem] md:pb-[110px] xl:pb-[140px]">
      <PageTitle
        variant="title-lg"
        title="마켓플레이스"
        className="hidden md:block"
        actions={
          <div className="w-[27.5rem]">
            <Button
              size="lg"
              className="w-full text-noto-18-bold"
              onClick={handleCreateClick}
            >
              나의 포토카드 판매하기
            </Button>
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
              options={GRADE_OPTIONS}
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
                label="매진여부"
                options={SOLD_OUT_OPTIONS}
                value={filters.soldOut}
                onChange={handleFilterChange('soldOut')}
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

      {isLoading ? (
        <div className="flex h-[20rem] items-center justify-center">
          <Spinner />
        </div>
      ) : cards.length === 0 ? (
        <EmptyPhotocardList
          isFiltered={isFiltered}
          emptyTitle="등록된 판매가 없습니다."
          emptyDescription="첫 번째 판매를 등록해보세요."
        />
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-[5px] md:mt-[1.875rem] md:gap-[20px] lg:grid-cols-3 lg:gap-[80px]">
          {cards.map((card) => (
            <Link key={card.id} href={`/marketplace/${card.id}`}>
              <Card type="marketplace" {...card} />
            </Link>
          ))}
        </div>
      )}

      {hasNextPage && <div ref={observerTargetRef} className="h-1" />}

      {isFilterOpen && (
        <MobileFilterBottomSheet
          tabs={FILTER_TABS} // ['grade', 'genre', 'soldOut']
          onClose={() => setIsFilterOpen(false)}
          draftSelection={draftSelection}
          onDraftChange={setDraftSelection}
          totalPhotos={displayCount}
          displayCount={displayCount}
          isCountLoading={isCountLoading}
          counts={initialCounts}
          onApply={(selection) => {
            setFilters({
              grade: selection.grade ?? null,
              genre: selection.genre ?? null,
              soldOut: selection.soldOut ?? null, // 그대로 유지
            });
          }}
        />
      )}

      <div className="fixed inset-x-0 bottom-0 z-10 bg-black p-[0.9375rem] md:hidden">
        <Button
          size="lg"
          className="w-full text-noto-18-bold"
          onClick={handleCreateClick}
        >
          나의 포토카드 판매하기
        </Button>
      </div>

      {showCreateModal && (
        <CreateSaleModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
