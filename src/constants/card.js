export const GRADE_STYLE = {
  common: {
    label: 'COMMON',
    borderColor: 'border-main',
    textColor: 'text-main',
  },
  rare: {
    label: 'RARE',
    borderColor: 'border-blue',
    textColor: 'text-blue',
  },
  super_rare: {
    label: 'SUPER RARE',
    borderColor: 'border-purple',
    textColor: 'text-purple',
  },
  legendary: {
    label: 'LEGENDARY',
    borderColor: 'border-pink',
    textColor: 'text-pink',
  },
};

export const GENRE = {
  album: '앨범',
  special: '특전',
  landscape: '풍경',
  season_greeting: '시즌그리팅',
  fan_meeting: '팬미팅',
  concert: '콘서트',
  md: 'MD',
  collage: '콜라주',
  branding: '브랜딩',
  etc: '기타',
};

export const SALE_STATUS = {
  SALE: '판매 중',
  SOLD_OUT: '판매 완료',
};

export const SALE_METHOD = {
  SALE: '판매',
  TRADE: '교환',
};

export const CARD_GRADE_OPTIONS = Object.entries(GRADE_STYLE).map(
  ([value, { label }]) => ({ value, label }),
);

export const CARD_GENRE_OPTIONS = Object.entries(GENRE).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const SALE_STATUS_OPTIONS = Object.entries(SALE_STATUS).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const SALE_METHOD_OPTIONS = Object.entries(SALE_METHOD).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
