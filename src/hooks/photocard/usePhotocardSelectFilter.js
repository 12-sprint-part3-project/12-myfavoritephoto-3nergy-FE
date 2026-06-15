import { useState, useMemo, useEffect } from 'react';
import { usePhotocardTotalCount } from '@/hooks/photocard/usePhotocardTotalCount';

export const usePhotocardSelectFilter = (data) => {
  // 바텀시트 내 선택 상태를 상위에서 관리: 선택 변경 시 displayCount를 즉시 계산하거나 API 호출
  const [draftSelection, setDraftSelection] = useState({
    grade: null,
    genre: null,
  });

  // gradeCounts/genreCounts 배열을 { [key]: count } 형태로 변환
  // 바텀시트 항목별 개수 표시에 사용
  const counts = useMemo(() => {
    if (!data) return {};
    const grade = Object.fromEntries(
      (data.gradeCounts ?? []).map(({ grade, count }) => [grade, count]),
    );
    const genre = Object.fromEntries(
      (data.genreCounts ?? []).map(({ genre, count }) => [genre, count]),
    );
    return { grade, genre };
  }, [data]);

  // 바텀시트 항목별 개수와 전체 개수를 최초 로드 시 한 번만 저장
  // 필터 적용 후 API 재호출 시 값이 바뀌는 것을 방지
  const [initialCounts, setInitialCounts] = useState(null);

  useEffect(() => {
    if (data && !initialCounts) {
      setInitialCounts(counts);
    }
  }, [data, counts, initialCounts]);

  const selectedGrade = draftSelection.grade;
  const selectedGenre = draftSelection.genre;

  // 등급 + 장르 둘 다 선택된 경우 API를 호출해 실제 교집합 totalCount를 가져옴
  const bothSelected = !!(selectedGrade && selectedGenre);

  const { data: filteredCount, isLoading: isCountLoading } =
    usePhotocardTotalCount(
      { grade: selectedGrade ?? '', genre: selectedGenre ?? '' },
      { enabled: bothSelected },
    );

  // 확인 버튼에 표시할 개수 계산
  // - 둘 다 선택: API 결과 (정확한 교집합)
  // - 등급만 선택: gradeCounts에서 바로 읽기 (API 호출 불필요)
  // - 장르만 선택: genreCounts에서 바로 읽기 (API 호출 불필요)
  // - 아무것도 선택 안 함: 전체 개수
  const displayCount = bothSelected
    ? filteredCount
    : selectedGrade
      ? counts?.grade?.[selectedGrade]
      : selectedGenre
        ? counts?.genre?.[selectedGenre]
        : data?.meta?.totalCount;

  return {
    draftSelection,
    setDraftSelection,
    initialCounts,
    displayCount,
    isCountLoading: bothSelected && isCountLoading,
  };
};
