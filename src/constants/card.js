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

// MobileFilterBottomSheet 에서 사용 중 — GRADE_STYLE.textColor 로 대체 예정
export const GRADE_TEXT_COLOR = Object.fromEntries(
  Object.entries(GRADE_STYLE).map(([key, { textColor }]) => [key, textColor]),
);

export const CARD_GRADE_OPTIONS = Object.entries(GRADE_STYLE).map(
  ([value, { label }]) => ({ value, label }),
);
