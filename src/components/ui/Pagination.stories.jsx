import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
      table: {
        type: { summary: 'number' },
      },
    },
    currentPage: {
      control: 'number',
      description: '현재 활성 페이지 (1-based)',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      control: false,
      description: '페이지 변경 핸들러',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
  },
};

export default meta;

function PaginationWithState({ totalPages, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

// 기본 상태 — 첫 페이지, << < 비활성화
export const Default = {
  render: () => <PaginationWithState totalPages={20} />,
};

// 전체 페이지가 윈도우보다 적을 때
export const FewPages = {
  render: () => <PaginationWithState totalPages={3} />,
};

// 마지막 페이지 — > >> 비활성화
export const LastPage = {
  render: () => <PaginationWithState totalPages={20} initialPage={20} />,
};
