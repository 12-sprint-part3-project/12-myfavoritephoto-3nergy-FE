const GradeBadge = ({ label, className, count }) => {
  return (
    <div
      className={`text-noto-14-light md:text-noto-16-light inline-flex shrink-0 items-center gap-[5px] border px-[10px] py-[6px] md:gap-[10px] md:px-5 md:py-2 ${className}`}
    >
      <span>{label}</span> <span>{count}장</span>
    </div>
  );
};

export default GradeBadge;
