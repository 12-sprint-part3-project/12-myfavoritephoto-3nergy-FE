import { normalizeKey } from '@/utils/normalizeKey';

export const QUERY_KEYS = {
  // 유저
  me: () => ['me'],

  point: {
    me: () => ['point', 'me'],
  },

  // 알림
  notifications: {
    all: () => ['notifications'],
  },

  // 포토카드
  photocards: {
    all: () => ['photocards'],
    list: (params) => ['photocards', 'list', params],
    detail: (id) => ['photocards', 'detail', normalizeKey.id(id)],
  },

  // 판매 (마켓플레이스)
  sales: {
    all: () => ['sales'],
    lists: () => ['sales', 'list'],
    list: (params) => ['sales', 'list', params],
    detail: (id) => ['sales', 'detail', normalizeKey.id(id)],
  },

  // 나의 판매 카드
  mySales: {
    all: () => ['mySales'],
    list: (params) => ['mySales', 'list', params],
  },

  // 보유 카드 (마이갤러리)
  myGallery: {
    all: () => ['myGallery'],
    list: (params) => ['myGallery', 'list', params],
  },
};
