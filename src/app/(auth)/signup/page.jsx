'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSignup } from '@/hooks/auth/useSignup';
import { useGoogleLogin } from '@/hooks/auth/useGoogleLogin';
import { APP_NAME } from '@/constants/app';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9_-]+$/;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;']/;
const RESERVED_NICKNAMES = [
  'system',
  'admin',
  'administrator',
  'root',
  'null',
  'undefined',
  '관리자',
  '운영자',
];

const SignupPage = () => {
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const { mutate: signup, isPending } = useSignup();
  const { loginWithGoogle, isPending: isGooglePending, error: googleError } = useGoogleLogin();

  const validateField = (name, values) => {
    switch (name) {
      case 'email':
        if (!values.email) return '이메일을 입력해 주세요.';
        if (!EMAIL_REGEX.test(values.email))
          return '이메일 형식이 올바르지 않습니다.';
        return '';

      case 'nickname':
        if (!values.nickname) return '닉네임을 입력해 주세요.';
        if (values.nickname.length < 2 || values.nickname.length > 10)
          return '닉네임은 2자 이상 10자 이하로 입력해 주세요.';
        if (!NICKNAME_REGEX.test(values.nickname))
          return '닉네임은 한글, 영문, 숫자, -, _ 만 사용할 수 있습니다.';
        if (RESERVED_NICKNAMES.includes(values.nickname.toLowerCase()))
          return '이미 사용 중인 닉네임입니다.';
        return '';

      case 'password':
        if (!values.password) return '비밀번호를 입력해 주세요.';
        if (values.password.length < 8)
          return '비밀번호는 8자 이상이어야 합니다.';
        if (!PASSWORD_UPPERCASE_REGEX.test(values.password))
          return '비밀번호는 대문자를 1자 이상 포함해야 합니다.';
        if (!PASSWORD_SPECIAL_CHAR_REGEX.test(values.password))
          return '비밀번호는 특수문자를 1자 이상 포함해야 합니다.';
        return '';

      case 'passwordConfirm':
        if (!values.passwordConfirm) return '비밀번호를 한번 더 입력해 주세요.';
        if (values.password !== values.passwordConfirm)
          return '비밀번호가 일치하지 않습니다.';
        return '';

      default:
        return '';
    }
  };

  const validate = (values) => {
    const next = {};
    ['email', 'nickname', 'password', 'passwordConfirm'].forEach((name) => {
      const message = validateField(name, values);
      if (message) next[name] = message;
    });
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    signup(
      { email: form.email, nickname: form.nickname, password: form.password },
      {
        onError: (err) => {
          if (err.code === 'EMAIL_ALREADY_EXISTS') {
            setErrors((prev) => ({ ...prev, email: err.message }));
          } else if (err.code === 'NICKNAME_ALREADY_EXISTS') {
            setErrors((prev) => ({ ...prev, nickname: err.message }));
          }
        },
      },
    );
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
          onBlur={handleBlur}
          error={errors.email}
        />
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          value={form.nickname}
          placeholder="닉네임을 입력해 주세요"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.nickname}
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          placeholder="8자 이상 입력해 주세요"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          value={form.passwordConfirm}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.passwordConfirm}
        />

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
          {googleError && (
            <p className="text-noto-14-regular text-red">{googleError.message}</p>
          )}
          <button
            type="button"
            className="text-noto-18-regular flex h-[3.4375rem] w-full cursor-pointer items-center justify-center gap-3 rounded-xs border border-gray-300 bg-white text-black transition-all duration-150 hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 md:h-[3.75rem]"
            onClick={loginWithGoogle}
            disabled={isGooglePending}
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
