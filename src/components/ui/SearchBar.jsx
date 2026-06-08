'use client';

import { useState } from 'react';
import { SearchIcon } from '@/icons';

export const SearchBar = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div className="relative">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색"
        className="text-noto-14-regular md:text-noto-16-regular h-[3.4375rem] w-full rounded-xs border border-white bg-black px-5 pr-14 text-white outline-none placeholder:text-gray-200 focus:border-main md:h-[3.75rem]"
      />
      <span className="pointer-events-none absolute top-1/2 right-5 h-6 w-6 -translate-y-1/2 text-white">
        <SearchIcon />
      </span>
    </div>
  );
};

