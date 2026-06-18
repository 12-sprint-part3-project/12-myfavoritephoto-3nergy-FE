import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="text-noto-32-bold text-white">404</h1>
      <p className="text-noto-16-regular text-gray-300">
        존재하지 않는 판매글입니다.
      </p>
      <Link
        href="/marketplace"
        className="text-noto-14-regular text-main underline"
      >
        마켓플레이스로 돌아가기
      </Link>
    </div>
  );
}
