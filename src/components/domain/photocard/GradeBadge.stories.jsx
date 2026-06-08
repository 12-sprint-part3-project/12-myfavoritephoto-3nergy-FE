import { CARD_GRADE_STYLE } from '@/constants/card';
import GradeBadge from './GradeBadge';

export default {
  title: 'Domain/Photocard/GradeBadge',
  component: GradeBadge,
  tags: ['autodocs'],
};

// 등급별로 각각 스토리 만들기
export const Common = {
  args: { ...CARD_GRADE_STYLE['COMMON'], count: 20 },
};

export const Rare = {
  args: { ...CARD_GRADE_STYLE['RARE'], count: 8 },
};

export const SuperRare = {
  args: { ...CARD_GRADE_STYLE['SUPER_RARE'], count: 3 },
};

export const Legendary = {
  args: { ...CARD_GRADE_STYLE['LEGENDARY'], count: 5 },
};
