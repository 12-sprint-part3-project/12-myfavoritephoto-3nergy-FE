import { GRADE_STYLE } from '@/constants/card';
import GradeBadge from './GradeBadge';

export default {
  title: 'Domain/Photocard/GradeBadge',
  component: GradeBadge,
  tags: ['autodocs'],
};

// 등급별로 각각 스토리 만들기
export const Common = {
  args: { ...GRADE_STYLE['common'], count: 20 },
};

export const Rare = {
  args: { ...GRADE_STYLE['rare'], count: 8 },
};

export const SuperRare = {
  args: { ...GRADE_STYLE['super_rare'], count: 3 },
};

export const Legendary = {
  args: { ...GRADE_STYLE['legendary'], count: 5 },
};
