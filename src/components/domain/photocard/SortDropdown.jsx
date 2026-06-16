'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/icons';

const SORT_OPTIONS = [
  { value: 'low-price', label: '낮은 가격순' },
  { value: 'high-price', label: '높은 가격순' },
  { value: 'latest', label: '최신순' },
];

export const SortDropdown = ({ value, onChange, className }) => {
  const isControlled = value !== undefined;
  const [internalSelected, setInternalSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = isControlled
    ? (SORT_OPTIONS.find((opt) => opt.value === value) ?? null)
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
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[2.1875rem] w-full cursor-pointer items-center justify-between gap-2 border border-gray-200 bg-black px-[0.9375rem] text-xs md:h-[3.4375rem] md:border-white md:bg-gray-500 md:px-4 md:text-noto-16-regular"
      >
        <span className={`whitespace-nowrap ${selectedOption ? 'text-white' : 'text-gray-300'}`}>
          {selectedOption ? selectedOption.label : '낮은 가격순'}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-white transition-transform duration-200 md:h-6 md:w-6 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full right-0 left-0 z-10 border border-t-0 border-gray-200 bg-black md:border-white md:bg-gray-500">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={`flex h-[2.1875rem] w-full cursor-pointer items-center whitespace-nowrap px-[0.9375rem] text-xs transition-colors hover:bg-gray-400 md:h-[3.4375rem] md:px-4 md:text-noto-16-regular ${
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
