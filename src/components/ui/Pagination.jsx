'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';
import { Page } from './Page';

// 양쪽 끝에 고정으로 보여줄 페이지 수 (1 2 3 ... n-2 n-1 n)
const EDGE_COUNT = 3;

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // totalPages가 양쪽 EDGE_COUNT 합산보다 클 때만 ... 표시
  const hasDots = totalPages > EDGE_COUNT * 2;

  // hasDots가 false면 모든 페이지를 firstPages에 담아 그냥 렌더링
  const firstPages = Array.from(
    { length: hasDots ? EDGE_COUNT : totalPages },
    (_, i) => i + 1,
  );
  const lastPages = hasDots
    ? Array.from(
        { length: EDGE_COUNT },
        (_, i) => totalPages - EDGE_COUNT + 1 + i,
      )
    : [];
  // ... 드롭다운에 들어갈 중간 페이지 목록
  const middlePages = hasDots
    ? Array.from(
        { length: totalPages - EDGE_COUNT * 2 },
        (_, i) => EDGE_COUNT + 1 + i,
      )
    : [];

  // 드롭다운이 열려있을 때 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const handlePageChange = (page) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <div className="mt-15 flex items-center justify-center gap-5 md:mt-30">
      <button
        type="button"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-white disabled:cursor-default disabled:text-gray-400"
      >
        <ChevronLeftIcon
          className={`${currentPage === 1 ? 'text-gray-400' : ''}`}
        />
      </button>

      <div className="flex items-center justify-center gap-[.625rem]">
        {firstPages.map((page, idx) =>
          // 세 번째 페이지(idx=2)는 md 미만에서 숨김 — 드롭다운 상단에서 접근 가능
          hasDots && idx === EDGE_COUNT - 1 ? (
            <span key={page} className="hidden md:block">
              <Page
                page={page}
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              />
            </span>
          ) : (
            <Page
              key={page}
              page={page}
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
            />
          ),
        )}

        {hasDots && (
          <div className="relative" ref={dropdownRef}>
            {/* hover 시 우하단 직각삼각형 표시, 클릭 시 드롭다운 토글 */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-white md:h-[2.8125rem] md:w-[2.8125rem] lg:h-[3.125rem] lg:w-[3.125rem]"
            >
              ...
              <span className="absolute right-0 bottom-0 hidden h-0 w-0 border-t-[.625rem] border-r-[.625rem] border-t-transparent border-r-white group-hover:block md:border-t-[.75rem] md:border-r-[.75rem]" />
            </button>

            {/* 최대 5개 높이까지 보이고 넘치면 스크롤 */}
            {isOpen && (
              <ul className="absolute top-full left-1/2 z-10 max-h-[12.5rem] -translate-x-1/2 overflow-y-auto border border-white bg-black">
                {/* md 미만에서만 표시 — 버튼 영역에서 숨겨진 firstPages[2] 보완 */}
                <li key={firstPages[EDGE_COUNT - 1]} className="md:hidden">
                  <Page
                    page={firstPages[EDGE_COUNT - 1]}
                    isActive={firstPages[EDGE_COUNT - 1] === currentPage}
                    onClick={() => handlePageChange(firstPages[EDGE_COUNT - 1])}
                  />
                </li>
                {middlePages.map((page) => (
                  <li key={page}>
                    <Page
                      page={page}
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    />
                  </li>
                ))}
                {/* md 미만에서만 표시 — 버튼 영역에서 숨겨진 lastPages[0] 보완 */}
                <li key={lastPages[0]} className="md:hidden">
                  <Page
                    page={lastPages[0]}
                    isActive={lastPages[0] === currentPage}
                    onClick={() => handlePageChange(lastPages[0])}
                  />
                </li>
              </ul>
            )}
          </div>
        )}

        {hasDots &&
          lastPages.map((page, idx) =>
            // 첫 번째 페이지(idx=0, 즉 n-2)는 md 미만에서 숨김 — 드롭다운 하단에서 접근 가능
            idx === 0 ? (
              <span key={page} className="hidden md:block">
                <Page
                  page={page}
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                />
              </span>
            ) : (
              <Page
                key={page}
                page={page}
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              />
            ),
          )}
      </div>

      <button
        type="button"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-white disabled:cursor-default disabled:text-gray-400"
      >
        <ChevronRightIcon
          className={`${currentPage === totalPages ? 'text-gray-400' : ''}`}
        />
      </button>
    </div>
  );
};
