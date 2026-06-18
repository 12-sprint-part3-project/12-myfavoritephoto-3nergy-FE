'use client';

import { SearchIcon } from '@/icons';

export const SearchBar = ({ value, onChange, placeholder = '검색' }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-noto-14-regular md:text-noto-16-regular focus:border-main placeholder:text-noto-16-light h-[2.8125rem] w-full rounded-xs border border-white bg-black px-5 pr-14 text-white outline-none placeholder:text-gray-200 lg:h-[3.125rem]"
      />
      <span className="pointer-events-none absolute top-1/2 right-5 h-6 w-6 -translate-y-1/2 text-white">
        <SearchIcon />
      </span>
    </div>
  );
};
