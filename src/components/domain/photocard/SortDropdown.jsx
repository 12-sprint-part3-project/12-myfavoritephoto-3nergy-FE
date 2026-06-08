'use client';

import { useState, useRef, useEffect } from 'react';
import ChevronDown from '@/icons/chevron-down.svg';

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
        className="flex h-[3.4375rem] w-full items-center justify-between border border-gray-400 bg-gray-500 px-4 text-noto-16-regular transition-colors hover:border-gray-300"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-300'}>
          {selectedOption ? selectedOption.label : '낮은 가격순'}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 shrink-0 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 top-full z-10 border border-t-0 border-gray-400 bg-gray-500">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={`flex h-[3.4375rem] w-full items-center px-4 text-noto-16-regular transition-colors hover:bg-gray-400 ${
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
