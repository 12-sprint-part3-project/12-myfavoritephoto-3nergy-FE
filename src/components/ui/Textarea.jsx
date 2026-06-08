'use client';

import { useId } from 'react';

export const Textarea = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  ...rest
}) => {
  const uid = useId();
  const textareaId = `${name}-${uid}`;

  return (
    <div className="flex flex-col gap-[.625rem]">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-white"
        >
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
        className="text-noto-14-regular md:text-noto-16-regular h-[10rem] w-full resize-none overflow-y-auto rounded-xs border border-white bg-black p-5 text-white outline-none placeholder:text-gray-200 focus:border-main md:h-[11.25rem]"
      />
    </div>
  );
};

