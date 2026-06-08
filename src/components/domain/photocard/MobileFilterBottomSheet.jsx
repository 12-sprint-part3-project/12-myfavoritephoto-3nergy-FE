'use client';

import { useState } from 'react';
import { CloseIcon, ExchangeIcon } from '@/icons';
import { FILTER_TAB_CONFIG } from '@/constants/filter';
import { GRADE_TEXT_COLOR } from '@/constants/card';
import { Button } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { BottomSheet } from '@/components/ui/BottomSheet';

export const MobileFilterBottomSheet = ({
  tabs, // 표시할 필터 탭 키 목록
  onClose, // 닫기 핸들러
  onApply, // 필터 적용 핸들러
  counts, // 각 필터 항목별 포토카드 개수
  totalPhotos, // 전체 포토카드 개수
  initialSelection = {}, // 이전에 적용된 선택값
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [draftSelection, setDraftSelection] = useState(
    tabs.reduce((acc, key) => {
      acc[key] = initialSelection[key] ?? null;
      return acc;
    }, {}),
  );

  const activeConfig = FILTER_TAB_CONFIG[activeTab];

  const selectOption = (option) => {
    setDraftSelection((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] === option ? null : option,
    }));
  };

  const isSelected = (option) => draftSelection[activeTab] === option;

  const resetFilter = () => {
    setDraftSelection(
      tabs.reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
    );
  };

  const applyFilter = () => {
    onApply?.(draftSelection);
    onClose();
  };

  // NOTE: API 연동 전까지 단순 합산 값 (정확한 AND 결과 아님)
  const totalCount = tabs.reduce((sum, key) => {
    const selected = draftSelection[key];
    if (!selected) return sum;
    return sum + (counts?.[key]?.[selected] ?? 0);
  }, 0);

  return (
    <Overlay onClose={onClose} align="end">
      <BottomSheet
        onClose={onClose}
        footer={
          <div className="flex w-full gap-2">
            <button
              onClick={resetFilter}
              aria-label="필터 초기화"
              className="group focus-visible:ring-main p-[0.94rem] focus-visible:ring-2 focus-visible:outline-none"
            >
              <ExchangeIcon className="text-gray-400 transition-colors duration-150 group-hover:text-white" />
            </button>
            <Button onClick={applyFilter} className="w-full">
              {totalCount > 0
                ? `${totalCount}개 포토 보기`
                : `${totalPhotos}개 포토 보기`}
            </Button>
          </div>
        }
      >
        {/* 헤더 */}
        <div className="relative flex justify-center py-4">
          <h2 className="text-noto-16-regular font-medium text-gray-400">
            필터
          </h2>
          <button
            onClick={onClose}
            aria-label="모달 닫기"
            className="group focus-visible:ring-main absolute top-0 right-0 flex h-6 w-6 items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          >
            <CloseIcon
              width={14}
              height={14}
              className="group-hover:text-main text-gray-400 transition-colors duration-150"
            />
          </button>
        </div>

        {/* 탭 */}
        <ul className="flex gap-6 border-b border-gray-500 px-6">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`text-noto-16-regular p-4 transition-colors duration-150 ${
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

        {/* 옵션 목록 */}
        <ul className="mt-[1.19rem] flex flex-col gap-[0.19rem]">
          {activeConfig.options.map((option) => (
            <li key={option}>
              <button
                onClick={() => selectOption(option)}
                className={`text-noto-14-regular flex w-full items-center justify-between px-8 py-4 text-left transition-colors duration-150 ${
                  isSelected(option) ? 'bg-gray-500' : 'hover:bg-gray-500/30'
                }`}
              >
                <span
                  className={
                    activeTab === 'grade'
                      ? GRADE_TEXT_COLOR[option]
                      : isSelected(option)
                        ? 'text-white'
                        : 'text-gray-300 hover:text-gray-200'
                  }
                >
                  {GRADE_TEXT_COLOR[option]?.label ?? option}
                </span>
                {counts?.[activeTab]?.[option] !== undefined && (
                  <span
                    className={isSelected(option) ? 'text-white' : 'text-gray-300'}
                  >
                    {counts[activeTab][option]}개
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </Overlay>
  );
};
