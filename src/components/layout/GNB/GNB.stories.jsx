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
    isRead: false,
    message:
      '예진쓰님이 [COMMON | 스페인 여행]의 포토카드 교환을 제안했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 3,
    isRead: true,
    message: '누군가 회원님의 포토카드를 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

const meta = {
  title: 'Layout/GNB/GNB',
  component: GNB,
  tags: ['autodocs'],
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
    onLogout: { action: 'onLogout' },
    onMenuClick: { action: 'onMenuClick' },
    onProfileClick: { action: 'onProfileClick' },
    onBack: { action: 'onBack' },
  },
};

export default meta;

export const GuestMain = {
  name: '비로그인 · 메인',
  args: {
    isAuthenticated: false,
  },
};

export const AuthMain = {
  name: '로그인 · 메인',
  args: {
    isAuthenticated: true,
    user: MOCK_USER,
    notifications: MOCK_NOTIFICATIONS,
  },
};

export const GuestSubPage = {
  name: '비로그인 · 서브 페이지',
  args: {
    isAuthenticated: false,
    pageTitle: '마이갤러리',
  },
};

export const AuthSubPage = {
  name: '로그인 · 서브 페이지',
  args: {
    isAuthenticated: true,
    user: MOCK_USER,
    pageTitle: '나의 포토카드 판매하기',
  },
};
