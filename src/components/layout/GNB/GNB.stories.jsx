import { GNB } from '@/components/layout/GNB/GNB';

const MOCK_USER = {
  nickname: '기며누',
  points: 120000,
};

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
    onLogout: { action: 'onLogout' },
    onMenuClick: { action: 'onMenuClick' },
    onAlarmClick: { action: 'onAlarmClick' },
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
