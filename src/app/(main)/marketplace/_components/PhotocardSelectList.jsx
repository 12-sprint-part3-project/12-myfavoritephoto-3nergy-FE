import { useState, useRef, useEffect, useCallback } from 'react';
import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from '@/constants/card';
import { useDebounce } from '@/hooks/common/useDebounce';
import { usePhotocardSelectList } from '@/hooks/photocard/usePhotocardSelectList';
import { usePhotocardFilterSelection } from '@/hooks/photocard/usePhotocardFilterSelection';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Card } from '@/components/domain/photocard/Card';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';

export const PhotocardSelectList = ({
  pageTitle,
  onSelect,
  scrollContainerRef,
}) => {
  const [params, setParams] = useState({
    keyword: '',
    grade: '',
    genre: '',
    sort: 'latest',
    pageSize: 20,
  });

  const debouncedKeyword = useDebounce(params.keyword, 300);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 포토카드 목록 조회 (무한스크롤)
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePhotocardSelectList({
    ...params,
    keyword: debouncedKeyword,
  });

  const {
    draftSelection,
    setDraftSelection,
    initialCounts,
    displayCount,
    isCountLoading,
  } = usePhotocardFilterSelection(data);

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
      // scrollContainerRef가 없으면 (모바일 페이지) 뷰포트 기준으로 감지
      root: scrollContainerRef?.current ?? null,
      threshold: 0.5,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver, scrollContainerRef]);

  const gradeOptions = [{ value: '', label: '전체' }, ...CARD_GRADE_OPTIONS];
  const genreOptions = [{ value: '', label: '전체' }, ...CARD_GENRE_OPTIONS];

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
        breadcrumb="마켓플레이스"
        title={pageTitle}
        variant="title-md"
        className="hidden md:mb-[1.25rem] md:block"
      />

      {/* 검색 + 필터 */}
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
          // draftSelection을 상위에서 관리해 선택 변경 시 displayCount 즉시 계산
          draftSelection={draftSelection}
          onDraftChange={setDraftSelection}
          totalPhotos={displayCount}
          // 장르와 필터 모두 선택된 경우에만 API 호출 중 로딩 표시
          isCountLoading={isCountLoading}
          onApply={(selected) => {
            setParams((prev) => ({
              ...prev,
              grade: selected.grade ?? '',
              genre: selected.genre ?? '',
            }));
          }}
          // 필터 적용 후에도 초기 기준 개수 유지
          counts={initialCounts}
          displayCount={displayCount}
        />
      )}

      {/* 카드 그리드 */}
      {data.photocards.length === 0 ? (
        <EmptyPhotocardList
          isFiltered={isFiltered}
          emptyTitle="판매 가능한 포토카드가 없습니다."
          emptyDescription="마이갤러리에서 포토카드를 생성해보세요."
        />
      ) : (
        <ul className="grid w-full grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:gap-[2.5rem]">
          {data.photocards.map((card) => (
            <li key={card.id}>
              <button className="w-full" onClick={() => onSelect(card)}>
                <Card
                  type="mygallery"
                  name={card.name}
                  imageUrl={card.imageUrl}
                  grade={card.grade}
                  genre={card.genre}
                  price={card.price}
                  quantity={card.quantity}
                  owner={card.ownerNickname}
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
