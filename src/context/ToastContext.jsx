'use client';

import { createContext, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/common/useToast';
import { Toast } from '@/components/ui/Toast';
import { setToastHandler } from '@/lib/toastService';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const { isVisible, message, showToast } = useToast();

  useEffect(() => {
    setToastHandler(showToast);

    return () => {
      setToastHandler(null);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} isVisible={isVisible} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext는 ToastProvider 안에서 사용해야 합니다.');
  }
  return context;
};
