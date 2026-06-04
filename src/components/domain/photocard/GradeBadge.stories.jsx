import { CARD_GRADE_COLOR } from '@/constants/card';
import GradeBadge from './GradeBadge';

export default {
  title: 'Domain/Photocard/GradeBadge',
  component: GradeBadge,
};

// 등급별로 각각 스토리 만들기
export const Common = {
  args: { ...CARD_GRADE_COLOR['COMMON'], count: 20 },
};

export const Rare = {
  args: { ...CARD_GRADE_COLOR['RARE'], count: 8 },
};

export const SuperRare = {
  args: { ...CARD_GRADE_COLOR['SUPER_RARE'], count: 3 },
};

export const Legendary = {
  args: { ...CARD_GRADE_COLOR['LEGENDARY'], count: 5 },
};
