import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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

export const FewPages = {
  render: () => <PaginationWithState totalPages={5} />,
};

export const SixPagesBoundary = {
  render: () => <PaginationWithState totalPages={6} initialPage={3} />,
};

export const WithEllipsis = {
  render: () => <PaginationWithState totalPages={15} />,
};

export const ActivePageInMiddle = {
  render: () => <PaginationWithState totalPages={15} initialPage={7} />,
};

export const LastPage = {
  render: () => <PaginationWithState totalPages={15} initialPage={15} />,
};

export const ManyPages = {
  render: () => <PaginationWithState totalPages={100} />,
};
