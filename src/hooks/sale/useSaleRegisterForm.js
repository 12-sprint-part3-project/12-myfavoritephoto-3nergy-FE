import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateSale } from '@/hooks/sale/useCreateSale';
import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from '@/constants/card';
import { validatePrice, validateDescription } from '@/utils/validators';

export const useSaleRegisterForm = (photocard) => {
  const router = useRouter();
  const { mutate: createSale, isPending } = useCreateSale();

  const [form, setForm] = useState({
    quantity: 1,
    price: 0,
    desiredGrade: CARD_GRADE_OPTIONS[0].value,
    desiredGenre: CARD_GENRE_OPTIONS[0].value,
    desiredDescription: '',
  });

  const [errors, setErrors] = useState({
    price: '',
    description: '',
  });

  const [touched, setTouched] = useState({
    price: false,
    description: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field, validator, value) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validator(value),
    }));
  };

  const isFormValid =
    !validatePrice(form.price) && !validateDescription(form.desiredDescription);

  const validateForm = () => {
    const newErrors = {
      price: validatePrice(form.price),
      description: validateDescription(form.desiredDescription),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTouched({ price: true, description: true });
      return;
    }

    createSale(
      {
        photocardId: photocard.id,
        ...form,
      },
      {
        onSuccess: () => {
          router.push(
            `/marketplace/create/result?status=success&name=${encodeURIComponent(photocard.name)}&grade=${photocard.grade}&quantity=${form.quantity}`,
          );
        },
        onError: (error) => {
          router.push(
            `/marketplace/create/result?status=failed&name=${encodeURIComponent(photocard.name)}&grade=${photocard.grade}&quantity=${form.quantity}&message=${encodeURIComponent(error.message)}`,
          );
        },
      },
    );
  };

  return {
    form,
    errors,
    touched,
    isPending,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  };
};
