'use client';

import { ResponsiveModal } from '@/components/ui/ResponsiveModal';
import { SaleEditForm } from '@/app/(main)/marketplace/[saleId]/_components/SaleEditForm';

export const SaleEditModal = ({ onClose, sale, onSubmit }) => {
  return (
    <ResponsiveModal onClose={onClose} className="max-h-[80vh] w-[35rem] p-10">
      <SaleEditForm sale={sale} onCancel={onClose} onSubmit={onSubmit} />
    </ResponsiveModal>
  );
};
