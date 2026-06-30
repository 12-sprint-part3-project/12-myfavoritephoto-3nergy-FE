import { ProfileMenu } from '@/components/layout/GNB/ProfileMenu';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const MOCK_USER = {
  nickname: '기며누',
  points: 120000,
};

const meta = {
  title: 'Layout/GNB/ProfileMenu',
  component: ProfileMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '300px',
      },
      description: {
        component: `GNB의 닉네임 혹은 프로필 아이콘을 클릭하면 열리는 메뉴입니다. sm(640px) 이상에서는 우측 상단 드롭다운으로, sm 미만(모바일)에서는 좌측에서 전체 높이로 펼쳐지는 드로어로 표시됩니다.`,
      },
    },
  },
  argTypes: {
    user: {
      control: 'object',
      description: '로그인 유저 정보',
      table: { type: { summary: '{ nickname: string, points: number }' } },
    },
    onLogout: {
      control: false,
      action: 'onLogout',
      description:
        '로그아웃 버튼 클릭 핸들러. 로그아웃 버튼은 모바일(md 미만) 레이아웃에만 노출됨.',
      table: { type: { summary: '() => void' } },
    },
    onClose: {
      control: false,
      action: 'onClose',
      description:
        '메뉴 닫기 핸들러. 배경 오버레이 클릭 또는 네비게이션 링크 클릭 시 호출.',
      table: { type: { summary: '() => void' } },
    },
  },
};

export default meta;

function ProfileMenuWithTrigger({ user }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)}>메뉴 다시 열기</Button>;
  }

  return (
    <ProfileMenu
      user={user}
      onClose={() => setIsOpen(false)}
      onLogout={() => alert('로그아웃')}
    />
  );
}

export const Default = {
  name: '기본',
  args: {
    user: MOCK_USER,
  },
  parameters: {
    docs: {
      source: {
        code: `
        <ProfileMenu
          user={user}
          onLogout={onLogout}
          onClose={() => setIsProfileOpen(false)}
        />`,
      },
    },
  },
  render: (args) => <ProfileMenuWithTrigger {...args} />,
};
