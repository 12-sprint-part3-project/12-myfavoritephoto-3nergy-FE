'use client';

import { useId } from 'react';

export const PriceInput = ({
  value,
  onChange,
  label,
  labelClassName = '',
  error,
  ...rest
}) => {
  const id = useId();

  const handleChange = (e) => {
    const num = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    onChange(Number(num));
  };

  return (
    <div className="flex w-full items-start justify-between">
      <label htmlFor={id} className={`text-white ${labelClassName}`}>
        {label}
      </label>

      <div className="flex flex-col">
        <div className="flex h-[45px] w-[202px] items-center justify-between rounded-sm border border-gray-200 bg-black px-[0.8175rem] py-[0.625rem] lg:h-[50px] lg:w-[245px] lg:py-[0.8125rem]">
          <input
            id={id}
            type="text"
            inputMode="numeric"
            placeholder="숫자만 입력"
            value={value}
            onChange={handleChange}
            className="w-full bg-transparent text-white outline-none"
            {...rest}
          />

          <span className="shrink-0 text-gray-300">P</span>
        </div>

        {error && <p className="text-noto-16-light text-red mt-2">{error}</p>}
      </div>
    </div>
  );
};
