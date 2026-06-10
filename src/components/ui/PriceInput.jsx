'use client';

import { useId } from 'react';

export const PriceInput = ({ value, onChange, label, labelClassName = '' }) => {
  const id = useId();

  const handleChange = (e) => {
    const num = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    onChange(Number(num));
  };

  return (
    <div className="flex w-full items-center justify-between">
      <label htmlFor={id} className={`text-white ${labelClassName}`}>
        {label}
      </label>
      <div className="flex h-[45px] w-[202px] items-center justify-between rounded-sm border border-gray-200 bg-black px-[0.8175rem] py-[0.625rem] lg:h-[50px] lg:w-[245px] lg:py-[0.8125rem]">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder="숫자만 입력"
          value={value}
          onChange={handleChange}
          className="text-noto-18-regular lg:text-noto-20-regular md:placeholder:text-noto-14-light lg:placeholder:text-noto-16-light w-full bg-transparent text-white outline-none placeholder:text-gray-200"
        />
        <span className="text-noto-20-bold lg:text-noto-18-bold shrink-0 text-gray-300">
          P
        </span>
      </div>
    </div>
  );
};
