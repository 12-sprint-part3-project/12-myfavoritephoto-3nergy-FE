'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLogin } from '@/hooks/auth/useLogin';
import { APP_NAME } from '@/constants/app';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_CREDENTIALS_MESSAGE = '이메일 또는 비밀번호가 일치하지 않습니다.';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { mutate: login, isPending } = useLogin();

  const validateField = (name, values) => {
    switch (name) {
      case 'email':
        if (!values.email) return '이메일을 입력해 주세요.';
        if (!EMAIL_REGEX.test(values.email))
          return '이메일 형식이 올바르지 않습니다.';
        return '';

      case 'password':
        if (!values.password) return '비밀번호를 입력해 주세요.';
        return '';

      default:
        return '';
    }
  };

  const validate = (values) => {
    const next = {};
    ['email', 'password'].forEach((name) => {
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

    login(
      { email: form.email, password: form.password },
      {
        onError: (err) => {
          if (['USER_NOT_FOUND', 'INVALID_PASSWORD'].includes(err.code)) {
            setErrors((prev) => ({
              ...prev,
              email: INVALID_CREDENTIALS_MESSAGE,
              password: INVALID_CREDENTIALS_MESSAGE,
            }));
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
        autoComplete="off"
        className="flex w-full flex-col gap-5"
        noValidate
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
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <div className="mt-2 flex flex-col gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
            className="w-full"
          >
            <span className="text-noto-18-bold">로그인</span>
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
        최애의 포토가 처음이신가요?{' '}
        <Link href="/signup" className="text-main underline hover:brightness-90">
          회원가입하기
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
