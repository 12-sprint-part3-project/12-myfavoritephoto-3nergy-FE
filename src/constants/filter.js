export const FILTER_TAB_CONFIG = {
  grade: {
    label: '등급',
    options: ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'],
    multiple: true, // 다중 선택
  },
  genre: {
    label: '장르',
    options: ['여행', '풍경', '인물', '사료'],
    multiple: true, // 다중 선택
  },
  soldOut: {
    label: '매진 여부',
    options: ['판매 중', '판매 완료'],
    multiple: false, // 단일 선택
  },
  method: {
    label: '판매 방법',
    options: ['교환', '판매'],
    multiple: false, // 단일 선택
  },
};
