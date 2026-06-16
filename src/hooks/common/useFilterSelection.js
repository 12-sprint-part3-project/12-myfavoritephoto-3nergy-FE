import { useState, useMemo, useEffect } from 'react';
import { useTotalCount } from '@/hooks/common/useTotalCount';

const DEFAULT_COUNT_KEY_MAP = {
  gradeCounts: 'grade',
  genreCounts: 'genre',
  saleStatusCounts: 'status',
  saleMethodCounts: 'saleMethod',
};

export const useFilterSelection = (data, tabs, options = {}) => {
  const {
    mapToApiParams,
    totalCountQueryKey,
    totalCountQueryFn,
    countKeyMap = {},
    totalCount,
  } = options;

  const resolvedCountKeyMap = useMemo(
    () => ({ ...DEFAULT_COUNT_KEY_MAP, ...countKeyMap }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // 바텀시트 내 선택 상태를 상위에서 관리: 선택 변경 시 displayCount를 즉시 계산하거나 API 호출하기 위함
  // tabs 기반으로 초기 선택 상태 동적 생성
  const [draftSelection, setDraftSelection] = useState(
    tabs.reduce((acc, key) => ({ ...acc, [key]: null }), {}),
  );

  // *Counts 키를 동적으로 찾아서 변환 ex) gradeCounts → grade
  const counts = useMemo(() => {
    if (!data) return {};
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => key.endsWith('Counts'))
        .map(([key, value]) => {
          const tabKey = resolvedCountKeyMap[key] ?? key.replace('Counts', '');
          // itemKey는 API 응답 필드명 — DEFAULT_COUNT_KEY_MAP 기준값 사용
          const itemKey =
            DEFAULT_COUNT_KEY_MAP[key] ?? key.replace('Counts', '');
          return [
            tabKey,
            Object.fromEntries(
              (value ?? []).map((item) => [item[itemKey], item.count]),
            ),
          ];
        }),
    );
  }, [data, resolvedCountKeyMap]);

  // 바텀시트 항목별 개수를 최초 로드 시 한 번만 저장
  // 필터 적용 후 API 재호출 시 값이 바뀌는 것을 방지
  const [initialCounts, setInitialCounts] = useState(null);

  useEffect(() => {
    if (data && !initialCounts) {
      setInitialCounts(counts);
    }
  }, [data, counts, initialCounts]);

  // 선택된 필터 키 목록
  const selectedEntries = tabs.filter((key) => !!draftSelection[key]);
  const selectedCount = selectedEntries.length;

  // 2개 이상 선택 시 API를 호출해 실제 교집합 totalCount를 가져옴
  const multiSelected = selectedCount >= 2;

  // 탭 키와 API 파라미터가 다를 경우 mapToApiParams로 변환
  const apiParams = mapToApiParams
    ? mapToApiParams(draftSelection)
    : Object.fromEntries(tabs.map((key) => [key, draftSelection[key] ?? '']));

  const resolvedQueryKey = totalCountQueryKey
    ? totalCountQueryKey({ ...apiParams, page: 1, pageSize: 1 })
    : [];

  const resolvedQueryFn = totalCountQueryFn
    ? () => totalCountQueryFn({ ...apiParams, page: 1, pageSize: 1 })
    : () => null;

  const { data: filteredCount, isLoading: isCountLoading } = useTotalCount(
    resolvedQueryKey,
    resolvedQueryFn,
    { enabled: multiSelected },
  );

  // 확인 버튼에 표시할 개수 계산
  // - 둘 다 선택: API 결과
  // - 단일 선택: counts에서 바로 읽기 (API 호출 불필요)
  // - 선택 없음: 전체 개수
  const displayCount = multiSelected
    ? filteredCount
    : selectedCount === 1
      ? counts?.[selectedEntries[0]]?.[draftSelection[selectedEntries[0]]]
      : (totalCount ?? data?.meta?.totalCount);

  return {
    draftSelection,
    setDraftSelection,
    initialCounts,
    displayCount,
    isCountLoading: multiSelected && isCountLoading,
  };
};
