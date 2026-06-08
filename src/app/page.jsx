import TestIcon from '@/icons/search.svg';

export default function Page() {
  return (
    <div className="flex items-center gap-4">
      <TestIcon width={20} className="text-red-500" />
      <TestIcon width={30} className="text-blue-500" />
      <TestIcon width={40} className="text-green-500 hover:text-black" />
    </div>
  );
}
