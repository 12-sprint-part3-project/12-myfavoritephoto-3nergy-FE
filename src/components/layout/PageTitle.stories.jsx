import ExchangeIcon from '@/icons/exchange.svg';
import { PageTitle } from '@/components/layout/PageTitle';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'layout/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '페이지, 모달, 섹션 등에서 사용하는 제목 컴포넌트입니다. variant로 계층을 구분합니다.',
      },
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['title-lg', 'title-md', 'heading', 'subheading'],
      order: 1,
      description: `제목 계층을 구분합니다.
- **title-lg**: 모바일·태블릿 48px / PC 62px
- **title-md**: 모바일·태블릿 40px / PC 46px
- **heading**: 모바일 24px / 태블릿 32px / PC 40px (섹션 제목)
- **subheading**: 모바일·태블릿 22px / PC 28px (서브 섹션 제목)`,
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

export const Default = {
  args: {
    variant: 'title-lg',
    title: '마켓 플레이스',
  },
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: `
    <div className="flex flex-col gap-8">
      <PageTitle variant="title-lg" title="마켓 플레이스" />
      <PageTitle variant="title-md" title="포토카드 생성" />
      <PageTitle variant="heading" title="우리집 앞마당" />
      <PageTitle variant="subheading" title="교환 희망 정보" />
    </div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <PageTitle variant="title-lg" title="마켓 플레이스" />
      <PageTitle variant="title-md" title="포토카드 생성" />
      <PageTitle variant="heading" title="우리집 앞마당" />
      <PageTitle variant="subheading" title="교환 희망 정보" />
    </div>
  ),
};

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
      leadingIcon={<ExchangeIcon width={28} height={28} />}
    />
  ),
};

export const HideBorderOnMobile = {
  args: {
    variant: 'title-md',
    title: '나의 포토카드 판매하기',
    breadcrumb: '마이갤러리',
    hideBorderOnMobile: true,
  },
  parameters: {
    docs: {
      description: {
        story: '모바일(768px 미만)에서 하단 선이 사라집니다.',
      },
    },
  },
};
