'use client';

import { useId } from 'react';

export const Textarea = ({
  label,
  labelClassName = 'lg:text-noto-20-bold text-noto-16-bold',
  name,
  value,
  placeholder,
  onChange,
  error,
  ...rest
}) => {
  const uid = useId();
  const textareaId = `${name}-${uid}`;

  return (
    <div className="flex flex-col gap-[.625rem]">
      {label && (
        <label htmlFor={textareaId} className={`${labelClassName} text-white`}>
          {label}
        </label>
      )}

      <textarea
        name={name}
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        className={`focus:invalid:border-red invalid:border-red text-noto-14-regular md:text-noto-16-regular focus:border-main placeholder:text-noto-14-light md:placeholder:text-noto-16-light h-[10rem] w-full resize-none overflow-y-auto rounded-xs border bg-black p-5 text-white outline-none placeholder:text-gray-200 md:h-[11.25rem] ${error ? 'border-red focus:border-red' : 'focus:border-main border-white'}`}
      />

      {error && <p className="text-noto-16-light text-red">{error}</p>}
    </div>
  );
};
