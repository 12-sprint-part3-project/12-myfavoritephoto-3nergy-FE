'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/common/useResponsive';
import { CreateSaleModal } from '@/app/(main)/marketplace/_components/CreateSaleModal';
import { Button } from '@/components/ui/Button';

export const CreateSaleButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showCreateModal, setShowCreateModal] = useState(false);

  usePrefetchPhotocardList(isMobile ? `/marketplace/create` : undefined);

  const handleCreateClick = () => {
    if (isMobile) {
      router.push('/marketplace/create');
    } else {
      setShowCreateModal(true);
    }
  };

  return (
    <div>
      <Button onClick={handleCreateClick}>판매 등록하기</Button>
      {showCreateModal && (
        <CreateSaleModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
