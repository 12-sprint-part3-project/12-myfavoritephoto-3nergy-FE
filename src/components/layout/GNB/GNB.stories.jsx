import { GNB } from '@/components/layout/GNB/GNB';

const MOCK_USER = {
  nickname: '기며누',
  points: 120000,
};

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    isRead: false,
    message: '기며누님이 [RARE | 우리집 앞마당]을 1장 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 2,
    isRead: true,
    message:
      '예진쓰님이 [COMMON | 스페인 여행]의 포토카드 교환을 제안했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const meta = {
  title: 'Layout/GNB/GNB',
  component: GNB,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `서비스 전역에서 사용되는 GNB(Global Navigation Bar)입니다. PC/태블릿과 모바일에서 레이아웃이 다르며, 로그인 여부에 따라 표시되는 내용이 달라집니다.

모바일에서는 페이지 종류에 따라 레이아웃이 달라집니다.
- 메인: 랜딩 페이지, 마켓플레이스 페이지. 로그인 여부에 따라 내용이 분기됩니다.
- 서브: 그 외 페이지. 뒤로가기 버튼 + 페이지 제목 형태로, 로그인 여부와 무관하게 동일합니다.

모바일 전용 서브 페이지 레이아웃은 docs 미리보기에서 정확히 표현되지 않아 Canvas 탭에서 확인해주세요.`,
      },
    },
  },
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: '로그인 여부',
      table: { type: { summary: 'boolean' } },
    },
    user: {
      control: 'object',
      description: '로그인 유저 정보',
      table: { type: { summary: '{ nickname: string, points: number }' } },
    },
    pageTitle: {
      control: 'text',
      description: '서브 페이지 제목 (없으면 메인 GNB)',
      table: { type: { summary: 'string' } },
    },
    notifications: {
      control: 'object',
      description: '알림 목록',
      table: {
        type: {
          summary:
            'Array<{ id: number, isRead: boolean, message: string, createdAt: string }>',
        },
      },
    },
    onLogout: {
      control: false,
      action: 'onLogout',
      description: '로그아웃 버튼 클릭 핸들러',
      table: { type: { summary: '() => void' } },
    },
    onMenuClick: {
      control: false,
      action: 'onMenuClick',
      description:
        '매뉴 버튼 혹은 닉네임 클릭 핸들러. 클릭 시 프로필 메뉴가 열림',
      table: { type: { summary: '() => void' } },
    },
    onBack: {
      control: false,
      action: 'onBack',
      description: '모바일 서브 페이지에서 뒤로가기 버튼 클릭 핸들러',
      table: { type: { summary: '() => void' } },
    },
    onMarkAsRead: {
      control: false,
      action: 'onMarkAsRead',
      description:
        'PC/태블릿에서 알림 목록(NotificationMenu)의 항목을 읽음 처리하는 핸들러',
      table: { type: { summary: '(id: number) => void' } },
    },
  },
};
export default meta;

export const GuestMain = {
  name: '비로그인 · 메인',
  args: {
    isAuthenticated: false,
  },
  parameters: {
    docs: {
      description: {
        story: `비로그인 상태의 메인 GNB입니다.

- PC/태블릿: 우측에 로그인/회원가입 링크만 노출되며, 알림·프로필 메뉴는 표시되지 않습니다.
- 모바일: 좌측에 메뉴 버튼, 우측에 로그인 링크가 노출됩니다.`,
      },
    },
  },
};

export const AuthMain = {
  name: '로그인 · 메인',
  args: {
    isAuthenticated: true,
    user: MOCK_USER,
    notifications: MOCK_NOTIFICATIONS,
  },
  parameters: {
    docs: {
      description: {
        story: `로그인 상태의 메인 GNB입니다.

- PC/태블릿: 포인트, 알림 아이콘, 닉네임, 로그아웃이 노출됩니다. 알림 아이콘 클릭 시 NotificationMenu가, 닉네임 클릭 시 ProfileMenu가 드롭다운으로 펼쳐집니다.
- 모바일: 좌측에 메뉴 버튼, 우측에 알림 아이콘이 노출됩니다. 메뉴 버튼 클릭 시 ProfileMenu가 드로어로 열리며, 알림 아이콘 클릭 시 별도의 알림 페이지로 이동합니다.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[350px] bg-white">
        <Story />
      </div>
    ),
  ],
};

export const SubPage = {
  name: '서브 페이지',
  tags: ['!autodocs'],
  args: {
    pageTitle: '나의 포토카드 판매하기',
  },
  globals: {
    viewport: { value: 'mobile', isRotated: false },
  },
};
