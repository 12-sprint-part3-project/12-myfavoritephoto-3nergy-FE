export const QUERY_KEYS = {
  // 유저
  me: ['me'],

  // 알림
  notifications: {
    all: ['notifications'],
  },

  // 포토카드
  photocards: {
    all: ['photocards'],
    detail: (id) => ['photocards', id],
  },

  // 판매 (마켓플레이스)
  sales: {
    all: ['sales'],
    detail: (id) => ['sales', id],
  },

  // 나의 판매 카드
  mySales: {
    all: ['mySales'],
  },

  // 보유 카드 (마이갤러리)
  myGallery: {
    all: ['myGallery'],
  },
};
