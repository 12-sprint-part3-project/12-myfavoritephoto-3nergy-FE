import { GRADE_STYLE } from '@/constants/card';
import GradeBadge from './GradeBadge';

export default {
  title: 'Domain/Photocard/GradeBadge',
  component: GradeBadge,
  tags: ['autodocs'],
};

// 등급별로 각각 스토리 만들기
export const Common = {
  args: { ...GRADE_STYLE['COMMON'], count: 20 },
};

export const Rare = {
  args: { ...GRADE_STYLE['RARE'], count: 8 },
};

export const SuperRare = {
  args: { ...GRADE_STYLE['SUPER_RARE'], count: 3 },
};

export const Legendary = {
  args: { ...GRADE_STYLE['LEGENDARY'], count: 5 },
};
