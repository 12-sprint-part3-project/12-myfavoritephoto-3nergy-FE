export const GRADE_STYLE = {
  COMMON: {
    label: 'COMMON',
    borderColor: 'border-main',
    textColor: 'text-main',
  },
  RARE: {
    label: 'RARE',
    borderColor: 'border-blue',
    textColor: 'text-blue',
  },
  SUPER_RARE: {
    label: 'SUPER RARE',
    borderColor: 'border-purple',
    textColor: 'text-purple',
  },
  LEGENDARY: {
    label: 'LEGENDARY',
    borderColor: 'border-pink',
    textColor: 'text-pink',
  },
};

// MobileFilterBottomSheet 에서 사용 중 — GRADE_STYLE.textColor 로 대체 예정
export const GRADE_TEXT_COLOR = Object.fromEntries(
  Object.entries(GRADE_STYLE).map(([key, { textColor }]) => [key, textColor]),
);

export const CARD_GRADE_OPTIONS = Object.entries(GRADE_STYLE).map(
  ([value, { label }]) => ({ value, label }),
);
