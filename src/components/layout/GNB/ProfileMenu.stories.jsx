import { ProfileMenu } from '@/components/layout/GNB/ProfileMenu';

const MOCK_USER = {
  nickname: '기며누',
  points: 120000,
};

const meta = {
  title: 'Layout/GNB/ProfileMenu',
  component: ProfileMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '500px',
      },
      description: {
        component:
          'GNB 프로필 메뉴입니다. PC/태블릿(≥640px)에서는 우측 상단 드롭다운으로, 모바일(<640px)에서는 좌측 전체 높이 드로어로 표시됩니다. 스토리북 툴바의 뷰포트를 조절해 두 가지 레이아웃을 확인할 수 있습니다.',
      },
    },
  },
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

export const Default = {
  name: '기본',
  args: {
    user: MOCK_USER,
  },
};
