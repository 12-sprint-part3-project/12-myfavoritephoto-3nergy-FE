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
          className={`h-[3.4375rem] w-full rounded-xs border bg-black px-5 text-noto-14-regular text-white outline-none placeholder:text-gray-200 invalid:border-red focus:border focus:invalid:border-red disabled:placeholder:text-gray-300 md:h-[3.75rem] md:text-noto-16-regular ${error ? 'border-red focus:border-red' : 'border-white focus:border-main'}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => (disabled ? prev : !prev))}
            className={`absolute top-[50%] right-5 h-[1.5rem] w-[1.5rem] -translate-y-[50%] ${disabled ? 'text-gray-400' : 'cursor-pointer text-white'}`}
            aria-label={showPassword ? '비밀번호 보기' : '비밀번호 가리기'}
          >
            {showPassword ? <VisibleIcon /> : <InvisibleIcon />}
          </button>
        )}
      </div>

      {error && <p className="text-noto-16-light text-red">{error}</p>}
    </div>
  );
};
