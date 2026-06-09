import { ProfileMenu } from '@/components/layout/GNB/ProfileMenu';

const MOCK_USER = {
  nickname: '기며누',
  points: 120000,
};

const meta = {
  title: 'Layout/GNB/ProfileMenu',
  component: ProfileMenu,
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: '로그인 유저 정보',
      table: { type: { summary: '{ nickname: string, points: number }' } },
    },
    onLogout: { action: 'onLogout' },
    onClose: { action: 'onClose' },
  },
};

export default meta;

export const Dropdown = {
  name: 'PC/태블릿 드롭다운',
  args: {
    user: MOCK_USER,
  },
};

export const Drawer = {
  name: '모바일 드로어',
  args: {
    user: MOCK_USER,
  },
};
