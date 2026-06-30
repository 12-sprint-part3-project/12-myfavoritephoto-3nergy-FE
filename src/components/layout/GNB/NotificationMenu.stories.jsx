import { NotificationMenu } from '@/components/layout/GNB/NotificationMenu';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    isRead: false,
    message: '기며누님이 [RARE | 우리집 앞마당]을 1장 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 방금 전
  },
  {
    id: 2,
    isRead: false,
    message:
      '예진쓰님이 [COMMON | 스페인 여행]의 포토카드 교환을 제안했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
  },
  {
    id: 3,
    isRead: true,
    message: '누군가 회원님의 포토카드를 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1주일 전
  },
];

const MOCK_NOTIFICATIONS_MANY = [
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
    message: '교환 제안이 수락되었습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 4,
    isRead: false,
    message: '기며누님이 [LEGENDARY | 한강뷰]를 2장 구매했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 5,
    isRead: true,
    message: '예진쓰님이 [SUPER RARE | 제주도] 교환을 제안했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 6,
    isRead: false,
    message: '기며누님이 [COMMON | 강아지] 교환을 제안했습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 7,
    isRead: true,
    message: '교환 제안이 거절되었습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
];

const meta = {
  title: 'Layout/GNB/NotificationMenu',
  component: NotificationMenu,
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;

export const Default = {
  args: {
    notifications: MOCK_NOTIFICATIONS,
  },
};

export const Empty = {
  args: {
    notifications: [],
  },
};

export const ManyNotifications = {
  args: {
    notifications: MOCK_NOTIFICATIONS_MANY,
  },
};
