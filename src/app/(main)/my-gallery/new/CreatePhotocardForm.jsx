'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FileInput } from '@/components/ui/FileInput';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CARD_GRADE_OPTIONS, GENRE, GRADE_STYLE } from '@/constants/card';
import { useCreatePhotocard } from '@/hooks/photocard/useCreatePhotocard';
import { CloseIcon } from '@/icons';

const GENRE_OPTIONS = Object.entries(GENRE).map(([value, label]) => ({
  value,
  label,
}));

/**
 * 포토카드 생성 폼 컴포넌트
 * @description 이름, 등급, 장르, 가격, 총 발행량, 사진, 설명을 입력받아 포토카드를 생성한다.
 *   생성 결과에 따라 성공/실패 화면을 표시하며, 마이갤러리 이동 버튼을 제공한다.
 */
export const CreatePhotocardForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreatePhotocard();
  const [step, setStep] = useState('form');

  const [form, setForm] = useState({
    name: '',
    grade: '',
    genre: '',
    price: '',
    totalQuantity: '',
    imageFile: null,
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === 'totalQuantity') next = value.replace(/\D/g, '');
    if (name === 'price')
      next = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePriceKeyDown = (e) => {
    if (e.key !== 'Backspace') return;
    e.preventDefault();
    const { selectionStart, selectionEnd, value } = e.target;
    const next =
      selectionStart === 0 && selectionEnd === value.length
        ? ''
        : form.price.slice(0, -1);
    setForm((prev) => ({ ...prev, price: next }));
    if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
  };

  const handleFileChange = (file) => {
    setForm((prev) => ({ ...prev, imageFile: file }));
    if (errors.imageFile) setErrors((prev) => ({ ...prev, imageFile: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = '포토카드 이름을 입력해 주세요.';
    if (!form.grade) errs.grade = '등급을 선택해 주세요.';
    if (!form.genre) errs.genre = '장르를 선택해 주세요.';

    const price = Number(form.price);
    if (!form.price) errs.price = '가격을 입력해 주세요.';
    else if (!Number.isFinite(price) || price <= 0)
      errs.price = '가격은 0보다 커야 합니다.';

    const qty = Number(form.totalQuantity);
    if (!form.totalQuantity || qty === 0)
      errs.totalQuantity = '최소 1장은 등록해야 합니다.';
    else if (qty > 10)
      errs.totalQuantity = '총 발행량은 10장 이하로 선택 가능합니다.';

    if (!form.imageFile) errs.imageFile = '사진을 업로드해 주세요.';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    mutate(
      {
        name: form.name,
        grade: form.grade,
        genre: form.genre,
        price: Number(form.price),
        totalQuantity: Number(form.totalQuantity),
        imageUrl: form.imageFile.name,
        description: form.description,
      },
      {
        onSuccess: () => setStep('success'),
        onError: () => setStep('error'),
      },
    );
  };

  if (step !== 'form') {
    const isSuccess = step === 'success';
    const gradeLabel = GRADE_STYLE[form.grade]?.label ?? '';

    return (
      <div className="relative w-full">
        <button
          type="button"
          className="absolute top-0 right-0 cursor-pointer text-white"
          onClick={() => router.push('/my-gallery')}
          aria-label="닫기"
        >
          <CloseIcon />
        </button>
        <div className="flex min-h-[calc(100dvh-12rem)] flex-col items-center justify-center gap-10 text-center">
          <h1 className="font-baskin-base text-baskin-24-bold md:text-baskin-40-bold lg:text-baskin-46-bold text-white">
            포토카드 생성{' '}
            <span className={isSuccess ? 'text-main' : 'text-gray-300'}>
              {isSuccess ? '성공' : '실패'}
            </span>
          </h1>
          <p className="text-noto-16-bold md:text-noto-20-bold text-white">
            [{gradeLabel} | {form.name}] 포토카드 생성에{' '}
            {isSuccess ? '성공했습니다!' : '실패했습니다.'}
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="w-full max-w-[440px]"
            onClick={() => router.push('/my-gallery')}
          >
            {isSuccess ? '마이갤러리에서 확인하기' : '마이갤러리로 돌아가기'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="mx-auto mt-[20px] w-full max-w-[520px] md:mt-[80px]"
    >
      <fieldset
        disabled={isPending}
        className="flex flex-col gap-10 border-0 p-0 md:gap-[3.75rem]"
      >
        <Input
          label="포토카드 이름"
          name="name"
          value={form.name}
          placeholder="포토카드 이름을 입력해 주세요"
          onChange={handleChange}
          error={errors.name}
        />
        <Select
          label="등급"
          name="grade"
          value={form.grade}
          options={CARD_GRADE_OPTIONS}
          placeholder="등급을 선택해 주세요"
          onChange={handleChange}
          error={errors.grade}
        />
        <Select
          label="장르"
          name="genre"
          value={form.genre}
          options={GENRE_OPTIONS}
          placeholder="장르를 선택해 주세요"
          onChange={handleChange}
          error={errors.genre}
        />
        <Input
          label="가격"
          name="price"
          value={form.price ? `${form.price}p` : ''}
          placeholder="가격을 입력해 주세요"
          onChange={handleChange}
          onKeyDown={handlePriceKeyDown}
          error={errors.price}
        />
        <Input
          label="총 발행량"
          name="totalQuantity"
          value={form.totalQuantity}
          placeholder="총 발행량을 입력해 주세요"
          onChange={handleChange}
          error={errors.totalQuantity}
        />
        <div className="flex flex-col gap-[.625rem]">
          <FileInput
            label="사진 업로드"
            name="imageUrl"
            onChange={handleFileChange}
          />
          {errors.imageFile && (
            <p className="text-noto-16-light text-red">{errors.imageFile}</p>
          )}
        </div>
        <Textarea
          label="포토카드 설명"
          name="description"
          value={form.description}
          placeholder="카드 설명을 입력해 주세요"
          onChange={handleChange}
        />
      </fieldset>
      <Button
        type="submit"
        size="lg"
        className="mt-10 w-full md:mt-[3.75rem]"
        disabled={isPending}
      >
        생성하기
      </Button>
    </form>
  );
};
