'use client';

export default function Error({ reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-noto-24-bold text-white">오류가 발생했습니다</h1>
      <p className="text-noto-16-regular text-gray-300">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={reset}
        className="text-noto-14-regular text-main underline"
      >
        다시 시도
      </button>
    </div>
  );
}
