import { ExchangeCard } from './ExchangeCard';

const meta = {
  title: 'Domain/Photocard/Card/Exchange',
  component: ExchangeCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '교환 제시 카드 컴포넌트입니다. 교환 요청자의 포토카드 정보와 설명, 승인/거절 버튼이 표시됩니다. 승인/거절 버튼 클릭 시 확인 모달이 열립니다.',
      },
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-2 gap-[5px] md:gap-5 lg:grid-cols-3 lg:gap-[30px]">
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['seller', 'buyer'],
      description:
        '카드 variant. seller는 승인/거절, buyer는 취소하기 버튼 표시',
      table: {
        type: { summary: "'seller' | 'buyer'" },
        defaultValue: { summary: 'seller' },
      },
    },
    imageUrl: {
      control: 'text',
      description: '카드 이미지 URL',
      table: { type: { summary: 'string' } },
    },
    name: {
      control: 'text',
      description: '카드 이름',
      table: { type: { summary: 'string' } },
    },
    grade: {
      control: 'select',
      options: ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'],
      description: '카드 등급',
      table: {
        type: { summary: 'COMMON | RARE | SUPER_RARE | LEGENDARY' },
      },
    },
    genre: {
      control: 'text',
      description: '카드 장르',
      table: { type: { summary: 'string' } },
    },
    owner: {
      control: 'text',
      description: '카드 소유자 닉네임',
      table: { type: { summary: 'string' } },
    },
    price: {
      control: 'number',
      description: '카드 구매 가격 (P)',
      table: { type: { summary: 'number' } },
    },
    description: {
      control: 'text',
      description: '교환 제시 설명',
      table: { type: { summary: 'string' } },
    },
    onAccept: {
      action: 'accepted',
      description:
        '승인 모달에서 승인하기 버튼 클릭 시 호출되는 핸들러 (seller variant 전용)',
      table: { type: { summary: '() => void' } },
    },
    onReject: {
      action: 'rejected',
      description:
        '거절 모달에서 거절하기 버튼 클릭 시 호출되는 핸들러 (seller variant 전용)',
      table: { type: { summary: '() => void' } },
    },
    onCancel: {
      action: 'canceled',
      description:
        '취소 모달에서 취소하기 버튼 클릭 시 호출되는 핸들러 (buyer variant 전용)',
      table: { type: { summary: '() => void' } },
    },
    isPending: {
      control: 'boolean',
      description: '액션 처리 중 상태. 모달 버튼 비활성화 및 로딩 텍스트 표시',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const baseArgs = {
  imageUrl: 'https://picsum.photos/seed/exchange/400/400',
  name: '노을 지는 한강',
  grade: 'rare',
  genre: 'landscape',
  owner: '하늘보리',
  price: 12,
  description: '한강에서 직접 찍은 노을 사진입니다.',
};

export const SellerVariant = {
  args: { ...baseArgs },
  parameters: {
    docs: {
      description: {
        story:
          '교환 제시 카드입니다. 제안된 포토카드 정보와 설명, 승인/거절 버튼이 표시됩니다.',
      },
    },
  },
};

export const BuyerVariant = {
  args: {
    ...baseArgs,
    variant: 'buyer',
  },
  parameters: {
    docs: {
      description: {
        story:
          '구매자가 자신이 제시한 교환을 확인하는 카드입니다. 취소하기 버튼이 표시됩니다.',
      },
    },
  },
};

export const BuyerVariantPending = {
  args: {
    ...baseArgs,
    variant: 'buyer',
    isPending: true,
  },
  parameters: {
    docs: {
      description: {
        story: '취소 요청 처리 중인 상태입니다. 모달 버튼이 비활성화됩니다.',
      },
    },
  },
};

export const LongDescription = {
  args: {
    ...baseArgs,
    grade: 'LEGENDARY',
    description:
      '정말 귀한 카드입니다. 교환 조건은 SUPER_RARE 이상이면 모두 환영합니다. 풍경, 인물, 동물 장르 모두 좋아요. 오래 기다려온 카드라 소중하게 교환해 주실 분만 연락 부탁드립니다. 감사합니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '설명이 긴 경우입니다. 3줄 이상은 말줄임표로 잘립니다.',
      },
    },
  },
};
