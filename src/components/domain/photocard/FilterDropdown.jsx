'use client';

import { useState, useRef, useEffect } from 'react';

export const FilterDropdown = ({ label, options = [], value, onChange }) => {
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
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-noto-16-regular text-gray-300 transition-colors hover:text-white"
      >
        <span>{selectedOption ? selectedOption.label : label}</span>
        <svg
          className={`h-3 w-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-full z-10 min-w-[8rem] bg-gray-500">
          {options.map((option) => (
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
