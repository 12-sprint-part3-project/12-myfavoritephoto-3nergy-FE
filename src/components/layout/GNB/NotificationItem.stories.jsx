import { NotificationItem } from '@/components/layout/GNB/NotificationItem';

const meta = {
  title: 'Layout/GNB/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-500">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isRead: {
      control: 'boolean',
      description: '읽음 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    message: {
      control: 'text',
      description: '알림 메시지',
      table: {
        type: { summary: 'string' },
      },
    },
    createdAt: {
      control: 'text',
      description: '알림 생성 시간',
      table: {
        type: { summary: 'string' },
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

export const Unread = {
  args: {
    isRead: false,
    message: '기며누님이 [RARE | 우리집 앞마당]을 1장 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
  },
};

export const Read = {
  args: {
    isRead: true,
    message: '기며누님이 [RARE | 우리집 앞마당]을 1장 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3일 전
  },
};
