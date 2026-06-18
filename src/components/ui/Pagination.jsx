'use client';

import { useEffect, useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/icons';
import { Page } from './Page';

const MD_BREAKPOINT = '(min-width: 768px)';
// 한 번에 보여줄 페이지 번호 개수 (모바일 3개, 데스크탑 5개)
const PAGE_GROUP_SIZE_MOBILE = 3;
const PAGE_GROUP_SIZE_DESKTOP = 5;

// 좌우 네비게이션 버튼
const NavButton = ({ onClick, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-white disabled:cursor-default disabled:cursor-not-allowed disabled:text-gray-400"
  >
    {children}
  </button>
);

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // 화면 너비에 따라 pageGroupSize(보여줄 페이지 수)를 다르게 설정
  const [pageGroupSize, setPageGroupSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MD_BREAKPOINT).matches
      ? PAGE_GROUP_SIZE_DESKTOP
      : PAGE_GROUP_SIZE_MOBILE,
  );

  // 브라우저 창 크기가 바뀔 때마다 pageGroupSize를 업데이트
  // addEventListener로 변화를 감지하고, cleanup 함수(return)로 이벤트 종료
  useEffect(() => {
    const mq = window.matchMedia(MD_BREAKPOINT);
    const handler = (e) =>
      setPageGroupSize(
        e.matches ? PAGE_GROUP_SIZE_DESKTOP : PAGE_GROUP_SIZE_MOBILE,
      );
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 현재 페이지를 중앙에 두는 슬라이딩 윈도우 계산
  // ex) 전체 20페이지, 현재 10페이지, pageGroupSize 5 → 8 9 [10] 11 12
  // Math.min으로 끝 부분에서 윈도우가 범위를 넘지 않게, Math.max로 앞 부분이 1 아래로 내려가지 않게 막는다
  const start = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(pageGroupSize / 2),
      totalPages - pageGroupSize + 1,
    ),
  );
  const end = Math.min(totalPages, start + pageGroupSize - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="mt-15 flex items-center justify-center gap-[10px] md:mt-30 md:gap-5">
      {/* 처음 페이지로 이동 — 이미 첫 페이지면 비활성화 */}
      <NavButton onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ChevronDoubleLeftIcon
          className={`${currentPage === 1 ? 'text-gray-400' : 'text-white'}`}
        />
      </NavButton>

      {/* 이전 페이지로 이동 */}
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon
          className={`${currentPage === 1 ? 'text-gray-400' : 'text-white'}`}
        />
      </NavButton>

      <div className="flex items-center gap-[10px]">
        {pages.map((page) => (
          <Page
            key={page}
            page={page}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ))}
      </div>

      {/* 다음 페이지로 이동 */}
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon
          className={`${currentPage === totalPages ? 'text-gray-400' : 'text-white'}`}
        />
      </NavButton>

      {/* 마지막 페이지로 이동 — 이미 마지막 페이지면 비활성화 */}
      <NavButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronDoubleRightIcon
          className={`${currentPage === totalPages ? 'text-gray-400' : 'text-white'}`}
        />
      </NavButton>
    </div>
  );
};
