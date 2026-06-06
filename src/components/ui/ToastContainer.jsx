'use client';

import { createPortal } from 'react-dom';

export const ToastContainer = ({ children }) => {
  return createPortal(
    <div className="pointer-events-none fixed top-6 left-1/2 z-50 -translate-x-1/2">
      {children}
    </div>,
    document.body,
  );
};
