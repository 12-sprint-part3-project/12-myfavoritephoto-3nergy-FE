'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, FilterIcon } from '@/icons';

export const FilterDropdown = ({
  label,
  options = [],
  value,
  onChange,
  onMobileClick,
  mobileButtonClassName,
}) => {
  const isControlled = value !== undefined;
  const [internalSelected, setInternalSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = isControlled
    ? (options.find((opt) => opt.value === value) ?? null)
    : internalSelected;

  const handleSelect = (option) => {
    if (!isControlled) setInternalSelected(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* 모바일: 필터 아이콘 버튼 → 바텀시트 오픈 */}
      <button
        type="button"
        onClick={onMobileClick}
        className={`flex cursor-pointer items-center justify-center rounded-xs border border-white md:hidden ${mobileButtonClassName ?? 'h-[2.1875rem] w-[2.1875rem]'}`}
      >
        <FilterIcon width={20} height={20} />
      </button>

      {/* PC/태블릿: 드롭다운 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-noto-16-regular hidden cursor-pointer items-center gap-1 text-gray-200 transition-colors hover:text-white md:flex"
      >
        <span>{selectedOption ? selectedOption.label : label}</span>
        <ChevronDownIcon
          className={`h-6 w-6 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-10 min-w-[8rem] rounded-xs border border-white bg-gray-500">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={`text-noto-16-regular flex h-[3.4375rem] w-full cursor-pointer items-center px-4 transition-colors hover:bg-gray-400 ${
                  selectedOption?.value === option.value
                    ? 'text-main'
                    : 'text-white'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
