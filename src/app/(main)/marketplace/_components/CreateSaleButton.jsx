'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/common/useResponsive';
import { CreateSaleModal } from '@/app/(main)/marketplace/_components/CreateSaleModal';
import { Button } from '@/components/ui/Button';

export const CreateSaleButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (isMobile) {
      router.prefetch('/marketplace/create');
    }
  }, [isMobile, router]);

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
