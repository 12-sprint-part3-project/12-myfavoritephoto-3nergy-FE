import { GRADE_STYLE } from '@/constants/card';
import GradeBadge from './GradeBadge';

const GradeBadgeList = ({ grades }) => {
  return (
    <div className="flex flex-nowrap items-center gap-[10px] overflow-x-auto md:gap-5">
      {grades.map(({ grade, count }) => (
        <GradeBadge
          key={grade}
          count={count}
          {...GRADE_STYLE[grade]}
        />
      ))}
    </div>
  );
};

export default GradeBadgeList;
