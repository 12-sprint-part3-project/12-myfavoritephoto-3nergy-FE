import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'UI/SearchBar',
  component: SearchBar,
  argTypes: {
    value: {
      control: 'text',
      description: '검색 키워드',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      action: 'changed',
      description: '검색어 변경 시 호출',
      table: { type: { summary: '(e: ChangeEvent) => void' } },
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트. 기본값: 검색',
      table: { type: { summary: 'string' } },
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '너비는 `w-full`이므로 래퍼 요소의 크기로 조절합니다.',
      },
    },
  },
};

export default meta;

export const Default = {
  args: {},
};

export const WithWrapper = {
  name: 'Width Control Example',
  render: () => {
    const [keyword, setKeyword] = useState('');
    return (
      <div className="w-[320px]">
        <SearchBar
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
    const [keyword, setKeyword] = useState('');
    return (
      <div className="w-[320px]">
        <SearchBar
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    );
        `,
      },
    },
  },
};
