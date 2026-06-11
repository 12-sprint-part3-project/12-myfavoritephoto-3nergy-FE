'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSignup } from '@/hooks/auth/useSignup';
import { APP_NAME } from '@/constants/app';

const SignupPage = () => {
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const { mutate: signup, isPending, error } = useSignup();

  // 이메일/닉네임 중복 에러는 전역 토스트 대신 해당 인풋 아래에 인라인으로 표시
  useEffect(() => {
    if (error?.code === 'EMAIL_ALREADY_EXISTS') {
      setErrors((prev) => ({ ...prev, email: error.message }));
    } else if (error?.code === 'NICKNAME_ALREADY_EXISTS') {
      setErrors((prev) => ({ ...prev, nickname: error.message }));
    }
  }, [error]);

  const validate = () => {
    const next = {};
    if (!form.email) next.email = '이메일을 입력해 주세요.';
    if (!form.nickname) next.nickname = '닉네임을 입력해 주세요.';
    if (!form.password) next.password = '비밀번호를 입력해 주세요.';
    else if (form.password.length < 8)
      next.password = '비밀번호는 8자 이상이어야 합니다.';
    if (!form.passwordConfirm)
      next.passwordConfirm = '비밀번호를 한번 더 입력해 주세요.';
    else if (form.password !== form.passwordConfirm)
      next.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    signup({
      email: form.email,
      nickname: form.nickname,
      password: form.password,
    });
  };

  return (
    <div className="flex flex-col items-center gap-10 py-[3.75rem] md:gap-[3.75rem]">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt={APP_NAME}
          width={189}
          height={35}
          unoptimized
          className="block md:hidden"
        />
        <Image
          src="/logo.svg"
          alt=""
          aria-hidden="true"
          width={331}
          height={60}
          unoptimized
          className="hidden md:block"
        />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5"
        noValidate
        autoComplete="off"
      >
        <Input
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          placeholder="이메일을 입력해 주세요"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={form.nickname}
          placeholder="닉네임을 입력해 주세요"
          onChange={handleChange}
          error={errors.nickname}
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          placeholder="8자 이상 입력해 주세요"
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          value={form.passwordConfirm}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          onChange={handleChange}
          error={errors.passwordConfirm}
        />

        {error &&
          !['EMAIL_ALREADY_EXISTS', 'NICKNAME_ALREADY_EXISTS'].includes(
            error.code,
          ) && (
            <p className="text-noto-14-regular text-red">{error.message}</p>
          )}

        <div className="mt-2 flex flex-col gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
            className="w-full"
          >
            <span className="text-noto-18-bold">가입하기</span>
          </Button>
          <button
            type="button"
            className="text-noto-18-regular flex h-[3.4375rem] w-full cursor-pointer items-center justify-center gap-3 rounded-xs border border-gray-300 bg-white text-black transition-all duration-150 hover:bg-gray-100 active:bg-gray-200 md:h-[3.75rem]"
            onClick={() => {}}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={22}
              height={22}
              unoptimized
            />
            Google로 시작하기
          </button>
        </div>
      </form>

      <p className="text-noto-16-regular text-gray-300">
        이미 최애의 포토 회원이신가요?{' '}
        <Link href="/login" className="text-main underline hover:brightness-90">
          로그인하기
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
