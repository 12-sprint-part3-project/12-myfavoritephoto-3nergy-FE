import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { usePhotocards } from '@/hooks/photocard/usePhotocards';
import { CARD_GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/card';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Card } from '@/components/domain/photocard/Card';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { EmptyPhotocardList } from '@/app/(main)/marketplace/_components/EmptyPhotocardList';

export const PhotocardSelectList = ({ onSelect, scrollContainerRef }) => {
  const [params, setParams] = useState({
    keyword: '',
    grade: '',
    genre: '',
    sort: 'latest',
    pageSize: 20,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePhotocards(params);

  // gradeCounts 배열을 { grade: count } 형태로 변환
  const counts = useMemo(() => {
    if (!data) return {};
    const grade = Object.fromEntries(
      (data.gradeCounts ?? []).map(({ grade, count }) => [grade, count]),
    );
    return { grade };
  }, [data]);

  const observerRef = useRef(null); // 스크롤 감지 타겟 ref
  const containerRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      // 감지 타겟이 뷰포트에 들어오고 다음 페이지가 있으면 fetchNextPage 호출
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      // root: 모달/바텀시트 스크롤 컨테이너 기준으로 감지
      // undefined면 뷰포트 기준 (모바일 페이지에서는 모달이 없으므로 scrollContainerRef도 없음)
      root: scrollContainerRef?.current ?? null,
      threshold: 0.5,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver, scrollContainerRef]);

  // 바텀시트에 넘길 초기 counts, totalCount 저장
  const [initialCounts, setInitialCounts] = useState(null);
  const [initialTotal, setInitialTotal] = useState(null);

  // 필터 적용 후 API 재호출 시 counts가 바뀌는 걸 방지하고자 최초 로드 시 한 번만 저장
  useEffect(() => {
    if (data && !initialCounts) {
      setInitialCounts(counts);
      setInitialTotal(data.meta.totalCount);
    }
  }, [data, counts, initialCounts]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
  const genreOptions = [{ value: '', label: '전체' }, ...GENRE_OPTIONS];

  const isFiltered = params.keyword || params.grade || params.genre;

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) {
    return <div className="text-white">로딩 중...</div>;
  }

  // TODO: 에러 컴포넌트로 교체
  if (error) {
    return <div className="text-white">에러가 발생했습니다.</div>;
  }

  return (
    <div ref={containerRef} className="w-full">
      <PageTitle
        breadcrumb="마이갤러리"
        title="나의 포토카드 판매하기"
        variant="title-md"
        className="hidden md:mb-[1.25rem] md:block"
      />

      {/* 검색 + 정렬 */}
      <div className="flex items-center gap-[0.63rem] pb-[1.25rem] md:gap-[1.875rem] md:pb-[2.5rem] lg:gap-[3.75rem]">
        <div className="order-2 w-full md:order-1 md:w-auto lg:w-[320px]">
          <SearchBar
            value={params.keyword}
            onChange={(e) =>
              setParams((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />
        </div>
        <div className="order-1 flex gap-[1.5625rem] md:order-2 lg:gap-[2.8125rem]">
          {/* 모바일: 아이콘 클릭 시 바텀시트 오픈 / 태블릿, PC: 드롭다운 */}
          <FilterDropdown
            label="등급"
            value={params.grade}
            onChange={(value) =>
              setParams((prev) => ({ ...prev, grade: value }))
            }
            onMobileClick={() => setIsFilterOpen(true)}
            options={gradeOptions}
            mobileButtonClassName="h-[2.8125rem] w-[2.8125rem]"
          />
          <div className="hidden md:block">
            <FilterDropdown
              label="장르"
              value={params.genre}
              onChange={(value) =>
                setParams((prev) => ({ ...prev, genre: value }))
              }
              options={genreOptions}
            />
          </div>
        </div>
      </div>

      {/* 모바일 필터 바텀시트 */}
      {isFilterOpen && (
        <MobileFilterBottomSheet
          tabs={['grade', 'genre']}
          onClose={() => setIsFilterOpen(false)}
          onApply={(selected) => {
            setParams((prev) => ({
              ...prev,
              grade: selected.grade ?? '',
              genre: selected.genre ?? '',

              page: 1,
            }));
          }}
          counts={initialCounts}
          totalPhotos={initialTotal}
        />
      )}

      {/* 카드 그리드 */}
      {data.photocards.length === 0 ? (
        <EmptyPhotocardList isFiltered={isFiltered} />
      ) : (
        <ul className="grid w-full grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:gap-[2.5rem]">
          {data.photocards.map((card) => (
            <li key={card.id}>
              <button className="w-full" onClick={() => onSelect(card)}>
                <Card
                  type="marketplace"
                  name={card.name}
                  imageUrl={card.imageUrl}
                  grade={card.grade}
                  genre={card.genre}
                  price={card.price}
                  totalQuantity={card.quantity}
                  remainingQuantity={card.remainingQuantity}
                  owner={card.ownerNickname}
                  status="SALE"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 무한스크롤 감지 타겟 */}
      <div ref={observerRef} className="h-4" />
      {isFetchingNextPage && (
        <div className="py-4 text-center text-white">로딩 중...</div>
      )}
    </div>
  );
};
