'use client';

import { useRouter } from 'next/navigation';
import { useSaleDetail } from '@/hooks/sale/useSaleDetail';
import { useUpdateSale } from '@/hooks/sale/useUpdateSale';
import { SaleEditForm } from '@/app/(main)/marketplace/[saleId]/_components/SaleEditForm';

export const SaleEditContent = ({ saleId }) => {
  const router = useRouter();
  const { data: sale, isLoading, error } = useSaleDetail(saleId);
  const { mutate: updateSale, isPending } = useUpdateSale(saleId);

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) return <div className="text-white">로딩 중...</div>;

  // TODO: 에러 컴포넌트로 교체
  if (error) return <div className="text-white">에러가 발생했습니다.</div>;

  return (
    <SaleEditForm
      sale={sale}
      isPending={isPending}
      onCancel={() => router.back()}
      onSubmit={(formData) => {
        updateSale(formData, {
          onSuccess: () => router.back(),
        });
      }}
    />
  );
};
