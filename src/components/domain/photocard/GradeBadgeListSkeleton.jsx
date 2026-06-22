const GradeBadgeListSkeleton = () => {
  return (
    <div className="flex flex-nowrap items-center gap-[10px] overflow-x-auto md:gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-[1.875rem] w-[5.5rem] animate-pulse rounded-sm bg-gray-400 md:h-[2.25rem] md:w-[6.5rem]"
        />
      ))}
    </div>
  );
};

export default GradeBadgeListSkeleton;
