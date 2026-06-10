'use client';

import { useId } from 'react';
import { ChevronDownIcon } from '@/icons';

export const Select = ({
  label,
  labelClassName = 'lg:text-noto-20-bold text-noto-16-bold',
  name,
  value,
  placeholder,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error,
  ...rest
}) => {
  const uid = useId();
  const selectId = `${name}-${uid}`;

  return (
    <div className="flex flex-col gap-[.625rem]">
      {label && (
        <label
          htmlFor={selectId}
          className={`${labelClassName} ${disabled ? 'text-gray-400' : 'text-white'}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          name={name}
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          {...rest}
          className={`text-noto-14-regular md:text-noto-16-regular h-[3.4375rem] w-full appearance-none rounded-xs border bg-black px-5 outline-none disabled:text-gray-300 md:h-[3.75rem] ${
            value ? 'text-white' : 'text-gray-200'
          } ${error ? 'border-red focus:border-red' : 'focus:border-main border-white'}`}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-black text-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        <span
          className={`pointer-events-none absolute top-[50%] right-5 h-[1.5rem] w-[1.5rem] -translate-y-[50%] ${disabled ? 'text-gray-400' : 'text-white'}`}
        >
          <ChevronDownIcon />
        </span>
      </div>

      {error && <p className="text-noto-16-light text-red">{error}</p>}
    </div>
  );
};
