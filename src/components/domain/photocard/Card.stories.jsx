import { Card } from './Card';

const meta = {
  title: 'Domain/Photocard/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '포토카드 목록에서 사용하는 카드 컴포넌트입니다. 일반 카드(marketplace/mysales/mygallery)는 Card, 교환 제시 카드는 ExchangeCard를 사용합니다.',
      },
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-2 gap-[5px] md:gap-[20px] lg:grid-cols-3 lg:gap-[80px]">
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['marketplace', 'mysales', 'mygallery'],
      description: '카드 타입',
      table: {
        type: { summary: 'marketplace | mysales | mygallery' },
      },
    },
    name: {
      control: 'text',
      description: '카드 이름',
      table: { type: { summary: 'string' } },
    },
    imageUrl: {
      control: 'text',
      description: '카드 이미지 URL',
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
      description: '판매자 닉네임',
      table: { type: { summary: 'string' } },
    },
    price: {
      control: 'number',
      description: '카드 가격 (P)',
      table: { type: { summary: 'number' } },
    },
    remainingQuantity: {
      control: 'number',
      description: '잔여 수량 — marketplace/mysales',
      table: { type: { summary: 'number' } },
    },
    totalQuantity: {
      control: 'number',
      description: '총 발행량 — marketplace',
      table: { type: { summary: 'number' } },
    },
    quantity: {
      control: 'number',
      description: '보유 수량 — mygallery',
      table: { type: { summary: 'number' } },
    },
    status: {
      control: 'select',
      options: ['SALE', 'TRADE_PENDING', 'SOLD_OUT'],
      description:
        'SALE · SOLD_OUT — marketplace/mysales 공통 / TRADE_PENDING — mysales 전용',
      table: {
        type: { summary: 'SALE | SOLD_OUT | TRADE_PENDING' },
      },
    },
  },
};

export default meta;

const baseArgs = {
  imageUrl: 'https://picsum.photos/seed/card/400/400',
  name: '우리집 앞마당',
  grade: 'COMMON',
  genre: '풍경',
  owner: '미쓰손',
  price: 4,
};

export const Marketplace = {
  args: {
    ...baseArgs,
    type: 'marketplace',
    remainingQuantity: 2,
    totalQuantity: 5,
    status: 'SALE',
  },
  parameters: {
    docs: {
      description: {
        story: '마켓플레이스 카드입니다. 잔여/발행량이 표시됩니다.',
      },
    },
  },
};

export const Mysales = {
  args: {
    ...baseArgs,
    type: 'mysales',
    grade: 'RARE',
    remainingQuantity: 1,
    status: 'SALE',
  },
  parameters: {
    docs: {
      description: {
        story:
          '판매 중인 카드입니다. 이미지 좌상단에 판매 상태 뱃지가 표시됩니다.',
      },
    },
  },
};

export const MysalesTradePending = {
  args: {
    ...baseArgs,
    type: 'mysales',
    grade: 'SUPER_RARE',
    remainingQuantity: 1,
    status: 'TRADE_PENDING',
  },
  parameters: {
    docs: {
      description: {
        story:
          '교환 제시 대기 중인 판매 카드입니다. 뱃지가 강조색으로 표시됩니다.',
      },
    },
  },
};

export const Mygallery = {
  args: {
    ...baseArgs,
    type: 'mygallery',
    grade: 'LEGENDARY',
    owner: '랄스타',
    quantity: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '보유 중인 카드입니다. 잔여 대신 수량이 표시됩니다.',
      },
    },
  },
};

export const SoldOut = {
  args: {
    ...baseArgs,
    type: 'marketplace',
    remainingQuantity: 0,
    totalQuantity: 5,
    status: 'SOLD_OUT',
  },
  parameters: {
    docs: {
      description: {
        story:
          '매진된 카드입니다. 이미지가 흐려지고 매진 아이콘이 표시됩니다. marketplace/mysales 모두 동일하게 적용됩니다.',
      },
    },
  },
};
