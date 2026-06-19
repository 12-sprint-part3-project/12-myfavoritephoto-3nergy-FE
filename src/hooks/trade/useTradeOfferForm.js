import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateTrade } from '@/hooks/trade/useCreateTrade';
import { validatePrice, validateDescription } from '@/utils/validators';

export const useTradeOfferForm = (photocard, sale) => {
  const router = useRouter();
  const { mutate: TradeOffer, isPending } = useCreateTrade(sale.saleId);

  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    setError(validateDescription(description));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateDescription(description);
    if (validationError) {
      setError(validationError);
      setTouched(true);
      return;
    }

    TradeOffer(
      {
        offeredCardId: photocard.userPhotocardIds[0],
        description,
      },
      {
        onSuccess: () => {
          router.push(
            `/marketplace/${sale.saleId}/trade/result?status=success`,
          );
        },
        onError: (error) => {
          const message = error?.statusCode
            ? error.message // 백엔드 에러 → 서버가 내려준 메시지
            : '오류가 발생했습니다. 다시 시도해주세요.'; // 프론트 에러 → 고정 문구

          router.push(
            `/marketplace/${sale.saleId}/trade/result?status=failed&message=${encodeURIComponent(message)}`,
          );
        },
      },
    );
  };

  return {
    description,
    setDescription,
    error,
    touched,
    isPending,
    handleBlur,
    handleSubmit,
  };
};
