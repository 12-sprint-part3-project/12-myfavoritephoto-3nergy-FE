'use client';

import { useId, useState } from 'react';
import { VisibleIcon, InvisibleIcon } from '@/icons';

export const Input = ({
  label,
  labelClassName = 'lg:text-noto-20-bold text-noto-16-bold',
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  error,
  hint,
  icon,
  ...rest
}) => {
  const uid = useId();
  const inputId = `${name}-${uid}`;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const passwordTypeToggle = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col gap-[.625rem]">
      {label && (
        <label
          htmlFor={inputId}
          className={`${labelClassName} ${disabled ? 'text-gray-400' : 'text-white'}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={passwordTypeToggle}
          name={name}
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...rest}
          className={`focus:invalid:border-red invalid:border-red text-noto-14-regular md:text-noto-16-regular h-[3.4375rem] w-full rounded-xs border bg-black px-5 text-white outline-none placeholder:text-gray-200 focus:border disabled:placeholder:text-gray-300 md:h-[3.75rem] ${error ? 'border-red focus:border-red' : 'focus:border-main border-white'}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => (disabled ? prev : !prev))}
            className={`absolute top-[50%] right-5 h-[1.5rem] w-[1.5rem] -translate-y-[50%] ${disabled ? 'text-gray-400' : 'cursor-pointer text-white'}`}
          >
            {showPassword ? <InvisibleIcon /> : <VisibleIcon />}
            <span className="sr-only">{showPassword ? '숨기기' : '보기'}</span>
          </button>
        )}
      </div>

      {error && <p className="text-noto-16-light text-red">{error}</p>}
    </div>
  );
};
