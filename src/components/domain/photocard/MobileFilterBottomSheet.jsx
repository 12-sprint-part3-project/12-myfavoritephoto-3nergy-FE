'use client';

import { useState } from 'react';
import { CloseIcon, ExchangeIcon } from '@/icons';
import { FILTER_TAB_CONFIG } from '@/constants/filter';
import { GRADE_STYLE, GENRE, SALE_STATUS, SALE_METHOD } from '@/constants/card';
import { Button } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';

export const MobileFilterBottomSheet = ({
  tabs, // 표시할 필터 탭 키 목록
  onClose, // 닫기 핸들러
  onApply, // 필터 적용 핸들러
  counts, // 각 필터 항목별 포토카드 개수 (초기 로드 기준)
  totalPhotos, // 확인 버튼에 표시할 개수 (선택 조합에 따라 다름)
  draftSelection, // 확인 전 선택 상태 (상위에서 관리)
  onDraftChange, // 선택 상태 변경 핸들러
  isCountLoading, // 등급+장르 둘 다 선택 시 API 호출 중 여부
  displayCount, // 버튼 비활성화 조건 판단용 (0개면 비활성화)
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const activeConfig = FILTER_TAB_CONFIG[activeTab];

  // 옵션 선택/해제 처리 (토글))
  const selectOption = (option) => {
    const newSelection = {
      ...draftSelection,
      [activeTab]: draftSelection[activeTab] === option ? null : option,
    };
    onDraftChange(newSelection);
  };

  // 현재 활성 탭에서 해당 옵션이 선택됐는지 확인
  const isSelected = (option) => {
    return draftSelection[activeTab] === option;
  };

  // 모든 탭의 선택값 초기화
  const resetFilter = () => {
    const emptySelection = tabs.reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {},
    );
    onDraftChange(emptySelection);
    onApply?.(emptySelection);
  };

  // 확인 버튼 클릭 시 선택값을 부모로 전달하고 닫기
  const applyFilter = () => {
    onApply?.(draftSelection);
    onClose();
  };

  return (
    <Overlay onClose={onClose} align="end">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative flex max-h-[90vh] min-h-[30rem] w-full flex-col rounded-t-[1.25rem] bg-filter-bottom-sheet-bg"
      >
        {/* 헤더 */}
        <div className="flex shrink-0 justify-center py-4">
          <h2
            id="modal-title"
            className="text-noto-16-regular font-medium text-gray-400"
          >
            필터
          </h2>
          <button
            onClick={onClose}
            aria-label="모달 닫기"
            className="group absolute top-[0.88rem] right-[0.9375rem] flex h-6 w-6 items-center justify-center focus-visible:ring-2 focus-visible:ring-main focus-visible:outline-none"
          >
            <CloseIcon
              width={14}
              height={14}
              className="text-gray-400 transition-colors duration-150 group-hover:text-main"
            />
          </button>
        </div>

        {/* 탭: 선택된 탭은 흰색 글씨와 하단 border 표시 */}
        <ul className="flex shrink-0 gap-6 overflow-x-auto border-b border-gray-500 px-6">
          {tabs.map((tab) => (
            <li key={tab} className="shrink-0">
              <button
                onClick={() => setActiveTab(tab)}
                className={`p-4 text-noto-16-regular whitespace-nowrap transition-colors duration-150 ${
                  activeTab === tab
                    ? 'border-b-[1.5px] border-white text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {FILTER_TAB_CONFIG[tab].label}
              </button>
            </li>
          ))}
        </ul>

        {/* 옵션 목록: 선택 시 배경색과 글자색 변경, 등급은 글자 색상 유지 */}
        <ul className="mt-[1.19rem] flex flex-1 flex-col gap-[0.19rem] overflow-y-auto">
          {activeConfig.options.map((option) => (
            <li key={option}>
              <button
                onClick={() => selectOption(option)}
                className={`flex w-full items-center justify-between px-8 py-4 text-left text-noto-14-regular transition-colors duration-150 ${
                  isSelected(option) ? 'bg-gray-500' : 'hover:bg-gray-500/30'
                }`}
              >
                <span
                  className={
                    activeTab === 'grade'
                      ? GRADE_STYLE[option]?.textColor // 등급은 항상 고유 색상 유지
                      : isSelected(option)
                        ? 'text-white'
                        : 'text-gray-300 hover:text-gray-200'
                  }
                >
                  {activeConfig.getLabel?.(option) ??
                    GRADE_STYLE[option]?.label ??
                    GENRE[option] ??
                    SALE_STATUS[option] ??
                    SALE_METHOD[option] ??
                    option}
                </span>

                {/* 항목별 포토카드 개수 (초기 로드 기준) */}
                {counts?.[activeTab]?.[option] !== undefined && (
                  <span
                    className={
                      isSelected(option) ? 'text-white' : 'text-gray-300'
                    }
                  >
                    {counts[activeTab][option]}개
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* 푸터: 초기화 버튼 + 확인 버튼  */}
        <div className="flex w-full shrink-0 gap-2 px-[18px] pb-[2.5rem]">
          <button
            onClick={resetFilter}
            aria-label="필터 초기화"
            className="group p-[0.94rem] focus-visible:ring-2 focus-visible:ring-main focus-visible:outline-none"
          >
            <ExchangeIcon className="text-gray-400 transition-colors duration-150 group-hover:text-white" />
          </button>

          {/* 조회 중이거나 결과가 0개면 버튼 비활성화 */}
          <Button
            onClick={applyFilter}
            disabled={isCountLoading || displayCount === 0}
            className="w-full"
          >
            {isCountLoading ? '조회 중...' : `${totalPhotos}개 포토 보기`}
          </Button>
        </div>
      </div>
    </Overlay>
  );
};
