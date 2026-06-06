import ExchangeIcon from '@/icons/alert.svg';
import { PageTitle } from '@/components/layout/PageTitle';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'layout/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['title-lg', 'title-md', 'heading', 'subheading'],
      order: 1,
      table: {
        type: { summary: 'title-lg | title-md | heading | subheading' },
      },
    },
    title: {
      control: 'text',
      description: '제목',
      table: {
        type: { summary: 'string' },
      },
    },
    breadcrumb: {
      control: 'text',
      description: '소제목 (선택)',
      table: {
        type: { summary: 'string' },
      },
    },
    leadingIcon: {
      control: false,
      description: '제목 왼쪽에 표시할 아이콘',
      table: { type: { summary: 'ReactNode' } },
    },
    actions: {
      control: false,
      description: '제목 오른쪽 영역에 표시할 콘텐츠 (버튼, 텍스트 등)',
      table: { type: { summary: 'ReactNode' } },
    },
    hideBreadcrumbOnMobile: {
      control: 'boolean',
      description: '모바일에서 breadcrumb 숨김 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideBorderOnMobile: {
      control: 'boolean',
      description: '모바일에서 하단 선 숨김 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: '추가 스타일 직접 지정',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

// 1. variant별 기본 형태
export const TitleLg = {
  args: { variant: 'title-lg', title: '마켓 플레이스' },
};

export const TitleMd = {
  args: { variant: 'title-md', title: '포토카드 생성' },
};

export const Heading = {
  args: { variant: 'heading', title: '우리집 앞마당' },
};

export const Subheading = {
  args: { variant: 'subheading', title: '교환 희망 정보' },
};

// 2. 옵션 조합
export const WithBreadcrumb = {
  args: {
    variant: 'title-md',
    title: '나의 포토카드 판매하기',
    breadcrumb: '마이갤러리',
  },
};

export const WithActions = {
  args: {
    variant: 'title-lg',
    title: '마켓 플레이스',
  },
  render: (args) => (
    <PageTitle
      {...args}
      actions={
        <Button size="lg" className="w-[27.5rem]">
          나의 포토카드 판매하기
        </Button>
      }
    />
  ),
};

export const WithLeadingIcon = {
  args: {
    variant: 'subheading',
    title: '교환 희망 정보',
  },
  render: (args) => (
    <PageTitle
      {...args}
      leadingIcon={
        <ExchangeIcon width={28} height={28} className="text-gray-300" />
      }
    />
  ),
};

// 3. 모바일 옵션
export const HideBorderOnMobile = {
  args: {
    variant: 'title-md',
    title: '나의 포토카드 판매하기',
    breadcrumb: '마이갤러리',
    hideBorderOnMobile: true,
  },
};
