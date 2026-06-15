import { GRADE_STYLE, GENRE, SALE_STATUS, SALE_METHOD } from './card';

export const FILTER_TAB_CONFIG = {
  grade: {
    label: '등급',
    options: Object.keys(GRADE_STYLE),
  },
  genre: {
    label: '장르',
    options: Object.keys(GENRE),
  },
  soldOut: {
    label: '매진 여부',
    options: Object.keys(SALE_STATUS),
  },
  method: {
    label: '판매 방법',
    options: Object.keys(SALE_METHOD),
  },
};
