'use client';

import { useId, useState } from 'react';
import { CloseIcon } from '@/icons';

export const FileInput = ({
  label,
  labelClassName = 'lg:text-noto-20-bold text-noto-16-bold',
  name,
  onChange,
  error,
}) => {
  const uid = useId();
  const inputId = `${name}-${uid}`;
  const [fileName, setFileName] = useState('');
  const [inputKey, setInputKey] = useState(0);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    if (onChange) onChange(file);
  };

  const handleClear = () => {
    setFileName('');
    setInputKey((prev) => prev + 1);
    if (onChange) onChange(null);
  };

  return (
    <div className="flex flex-col gap-[.625rem]">
      {label && (
        <label htmlFor={inputId} className={`${labelClassName} text-white`}>
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-[.625rem]">
        <div
          className={`relative flex h-[3.4375rem] flex-1 items-center overflow-hidden rounded-xs border bg-black px-5 md:h-[3.75rem] ${error ? 'border-red focus:border-red' : 'border-white focus:border-main'}`}
        >
          <span
            className={`min-w-0 flex-1 truncate text-noto-14-regular md:text-noto-16-regular ${fileName ? 'text-white' : 'text-gray-200'}`}
          >
            {fileName || '사진 업로드'}
          </span>
          {fileName && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-3 h-6 w-6 shrink-0 cursor-pointer text-white"
            >
              <CloseIcon />
              <span className="sr-only">파일 삭제</span>
            </button>
          )}
        </div>

        <label
          htmlFor={inputId}
          className="flex h-[3.4375rem] shrink-0 cursor-pointer items-center rounded-xs border border-main bg-black px-7 text-noto-14-regular text-main md:h-[3.75rem] md:text-noto-16-regular"
        >
          파일 선택
        </label>

        <input
          key={inputKey}
          id={inputId}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-noto-16-light text-red">{error}</p>}
    </div>
  );
};
