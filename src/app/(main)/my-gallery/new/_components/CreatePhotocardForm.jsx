'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CARD_GENRE_OPTIONS, CARD_GRADE_OPTIONS } from '@/constants/card';
import { getErrorHandler } from '@/constants/errorHandler';
import { useCreatePhotocard } from '@/hooks/photocard/useCreatePhotocard';
import { uploadImage } from '@/services/image';
import {
  validateCardName,
  validateDescription,
  validateGenre,
  validateGrade,
  validateImgFile,
  validatePrice,
  validateQuantity,
} from '@/utils/validators';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FileInput } from '@/components/ui/FileInput';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { showGlobalToast } from '@/lib/toast/toastService';

/**
 * 포토카드 생성 폼 컴포넌트
 * 이름, 등급, 장르, 가격, 총 발행량, 사진, 설명을 입력받아 포토카드를 생성한다.
 * 생성 결과에 따라 성공/실패 화면을 표시하며, 마이갤러리 이동 버튼을 제공한다.
 */
export const CreatePhotocardForm = () => {
  const router = useRouter();
  const { mutate: createPhotocard, isPending } = useCreatePhotocard();
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    grade: '',
    genre: '',
    price: '',
    totalQuantity: '',
    imageFile: null,
    description: '',
  });
  const [validateData, setValidateData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === 'totalQuantity') next = value.replace(/\D/g, '');
    if (name === 'price')
      next = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    setForm((prev) => ({ ...prev, [name]: next }));
    if (validateData[name])
      setValidateData((prev) => ({ ...prev, [name]: '' }));
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
    if (validateData.price) setValidateData((prev) => ({ ...prev, price: '' }));
  };

  const handleFileChange = (file) => {
    setForm((prev) => ({ ...prev, imageFile: file }));
    if (validateData.imageFile)
      setValidateData((prev) => ({ ...prev, imageFile: '' }));
  };

  // TODO: 이 부분도 중복패턴이 보여서 리팩토링을 하는게 나을지 몇개 안되는데 그냥 놔둘지...
  const validate = () => {
    const errs = {};
    errs.name = validateCardName(form.name);
    errs.grade = validateGrade(form.grade);
    errs.genre = validateGenre(form.genre);
    errs.description = validateDescription(form.description);

    const price = Number(form.price);
    errs.price = validatePrice(price);

    const qty = Number(form.totalQuantity);
    errs.totalQuantity = validateQuantity(qty);

    errs.imageFile = validateImgFile(form.imageFile);

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    const hasError = Object.values(errs).some((msg) => msg);
    if (hasError) {
      setValidateData(errs);
      return;
    }

    let imageUrl;
    try {
      setIsUploading(true);
      imageUrl = await uploadImage(form.imageFile);
    } catch {
      setStep('error');
      return;
    } finally {
      setIsUploading(false);
    }

    createPhotocard(
      {
        name: form.name,
        grade: form.grade,
        genre: form.genre,
        price: Number(form.price),
        totalQuantity: Number(form.totalQuantity),
        imageUrl,
        description: form.description,
      },
      {
        onSuccess: () => {
          router.push(
            `/my-gallery/new/result?status=success&name=${encodeURIComponent(form.name)}&grade=${form.grade}`,
          );
        },
        onError: (error) => {
          const handler = getErrorHandler(error?.code);

          if (handler.action === 'toast') {
            showGlobalToast(handler.message ?? error?.message);
          } else {
            router.push(
              `/my-gallery/new/result?status=failure&name=${encodeURIComponent(form.name)}&grade=${form.grade}`,
            );
          }
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="mx-auto mt-[20px] w-full max-w-[520px] md:mt-[80px]"
    >
      <fieldset
        disabled={isUploading || isPending}
        className="flex flex-col gap-10 border-0 p-0 md:gap-[3.75rem]"
      >
        <Input
          label="포토카드 이름"
          name="name"
          value={form.name}
          placeholder="포토카드 이름을 입력해 주세요"
          onChange={handleChange}
          error={validateData.name}
        />
        <Select
          label="등급"
          name="grade"
          value={form.grade}
          options={CARD_GRADE_OPTIONS}
          placeholder="등급을 선택해 주세요"
          onChange={handleChange}
          error={validateData.grade}
        />
        <Select
          label="장르"
          name="genre"
          value={form.genre}
          options={CARD_GENRE_OPTIONS}
          placeholder="장르를 선택해 주세요"
          onChange={handleChange}
          error={validateData.genre}
        />
        <Input
          label="가격"
          name="price"
          value={form.price ? `${form.price}p` : ''}
          placeholder="가격을 입력해 주세요"
          onChange={handleChange}
          onKeyDown={handlePriceKeyDown}
          error={validateData.price}
        />
        <Input
          label="총 발행량"
          name="totalQuantity"
          value={form.totalQuantity}
          placeholder="총 발행량을 입력해 주세요"
          onChange={handleChange}
          error={validateData.totalQuantity}
        />
        <div className="flex flex-col gap-[.625rem]">
          <FileInput
            label="사진 업로드"
            name="imageUrl"
            onChange={handleFileChange}
            error={validateData.imageFile}
          />
        </div>
        <Textarea
          label="포토카드 설명"
          name="description"
          value={form.description}
          placeholder="카드 설명을 입력해 주세요"
          onChange={handleChange}
          error={validateData.description}
        />
      </fieldset>
      <Button
        type="submit"
        size="lg"
        className="mt-10 w-full md:mt-[3.75rem]"
        disabled={isUploading || isPending}
      >
        생성하기
      </Button>
    </form>
  );
};
