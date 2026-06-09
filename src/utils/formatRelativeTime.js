import {
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export function formatRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);

  const years = differenceInYears(now, past);
  const months = differenceInMonths(now, past);
  const weeks = differenceInWeeks(now, past);
  const days = differenceInDays(now, past);
  const hours = differenceInHours(now, past);

  if (years >= 1) return `${years}년 전`;
  if (months >= 1) return `${months}개월 전`;
  if (weeks >= 1) return `${weeks}주일 전`;
  if (days >= 1) return `${days}일 전`;
  if (hours >= 1) return `${hours}시간 전`;

  return '방금 전';
}
