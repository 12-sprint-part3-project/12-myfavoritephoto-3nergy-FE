'use client';

import { useId, useState } from 'react';
import Close from '@/icons/close.svg';

const FileInput = ({ label, name, onChange }) => {
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
        <label htmlFor={inputId} className="text-white">
          {label}
        </label>
      )}

      <div className="flex gap-[.625rem]">
        <div className="relative flex h-[3.4375rem] flex-1 items-center overflow-hidden rounded-xs border border-white bg-black px-5 md:h-[3.75rem]">
          <span
            className={`text-noto-14-regular md:text-noto-16-regular min-w-0 flex-1 truncate ${fileName ? 'text-white' : 'text-gray-200'}`}
          >
            {fileName || '사진 업로드'}
          </span>
          {fileName && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-3 h-6 w-6 shrink-0 cursor-pointer text-white"
            >
              <Close />
              <span className="sr-only">파일 삭제</span>
            </button>
          )}
        </div>

        <label
          htmlFor={inputId}
          className="text-noto-14-regular md:text-noto-16-regular border-main text-main flex h-[3.4375rem] shrink-0 cursor-pointer items-center rounded-xs border bg-black px-7 md:h-[3.75rem]"
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
    </div>
  );
};

export default FileInput;
