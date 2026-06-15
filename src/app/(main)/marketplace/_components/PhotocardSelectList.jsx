import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { usePhotocardSelectList } from '@/hooks/photocard/usePhotocardSelectList';
import { usePhotocardTotalCount } from '@/hooks/photocard/usePhotocardTotalCount';
import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from '@/constants/card';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Card } from '@/components/domain/photocard/Card';
import { MobileFilterBottomSheet } from '@/components/domain/photocard/MobileFilterBottomSheet';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';

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
  } = usePhotocardSelectList(params);

  // gradeCounts/genreCounts 배열을 { [key]: count } 형태로 변환
  // 바텀시트 항목별 개수 표시에 사용
  const counts = useMemo(() => {
    if (!data) {
      return {};
    }
    const grade = Object.fromEntries(
      (data.gradeCounts ?? []).map(({ grade, count }) => [grade, count]),
    );
    const genre = Object.fromEntries(
      (data.genreCounts ?? []).map(({ genre, count }) => [genre, count]),
    );
    return { grade, genre };
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
      // scrollContainerRef가 없으면 (모바일 페이지) 뷰포트 기준으로 감지
      root: scrollContainerRef?.current ?? null,
      threshold: 0.5,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver, scrollContainerRef]);

  // 바텀시트에 넘길 항목별 개수(counts)와 전체 개수(initialTotal)
  const [initialCounts, setInitialCounts] = useState(null);
  const [initialTotal, setInitialTotal] = useState(null);

  // 필터 적용 후 API 재호출 시 값이 바뀌는 걸 방지하고자 최초 로드 시 한 번만 저장
  useEffect(() => {
    if (data && !initialCounts) {
      setInitialCounts(counts);
      setInitialTotal(data.meta.totalCount);
    }
  }, [data, counts, initialCounts]);

  // 바텀시트 내 선택 상태를 상위 컴포넌트에서 관리: 선택 변경 시 displayCount를 즉시 계산하거나 API 호출
  const [draftSelection, setDraftSelection] = useState({
    grade: null,
    genre: null,
  });

  const selectedGrade = draftSelection.grade;
  const selectedGenre = draftSelection.genre;

  // 등급과 장르 둘 다 선택된 경우에만 API를 호출해 실제 교집합 totalCount를 가져옴
  const bothSelected = !!(selectedGrade && selectedGenre);

  const { data: filteredCount, isLoading: isCountLoading } =
    usePhotocardTotalCount({
      grade: selectedGrade ?? '',
      genre: selectedGenre ?? '',
      enabled: bothSelected,
    });

  // 확인 버튼에 표시할 개수 계산
  const displayCount = bothSelected
    ? filteredCount // 둘 다 선택: API 결과
    : selectedGrade
      ? counts?.grade?.[selectedGrade] // 등급만 선택: counts에서 바로 (API 호출 불필요)
      : selectedGenre
        ? counts?.genre?.[selectedGenre] // 장르만 선택: counts에서 바로 (API 호출 불필요)
        : data?.meta?.totalCount; // 아무것도 선택 안 함: 전체

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        breadcrumb="마이갤러리"
        title="나의 포토카드 판매하기"
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
          isCountLoading={bothSelected && isCountLoading}
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
