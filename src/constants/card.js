export const GRADE_TEXT_COLOR = {
  COMMON: 'text-main',
  RARE: 'text-blue',
  SUPER_RARE: 'text-purple',
  LEGENDARY: 'text-pink',
};

export const CARD_GRADE_STYLE = {
  COMMON: {
    label: 'COMMON',
    className: 'border-main text-main',
  },
  RARE: {
    label: 'RARE',
    className: 'border-blue text-blue',
  },
  SUPER_RARE: {
    label: 'SUPER RARE',
    className: 'border-purple text-purple',
  },
  LEGENDARY: {
    label: 'LEGENDARY',
    className: 'border-pink text-pink',
  },
};

export const CARD_GRADE_OPTIONS = Object.entries(CARD_GRADE_STYLE).map(
  ([value, { label }]) => ({ value, label }),
);
