import { GENRE, GRADE_STYLE } from './card';

export const FILTER_TAB_CONFIG = {
  grade: {
    label: '등급',
    options: Object.keys(GRADE_STYLE),
  },
  genre: {
    label: '장르',
    options: Object.keys(GENRE), // Object.values → Object.keys로 변경
  },
  soldOut: {
    label: '매진 여부',
    options: ['판매 중', '판매 완료'],
  },
  method: {
    label: '판매 방법',
    options: ['교환', '판매'],
  },
};
