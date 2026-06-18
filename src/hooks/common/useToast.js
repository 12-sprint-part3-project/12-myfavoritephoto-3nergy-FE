import { useState, useCallback, useRef } from 'react';

export const useToast = (duration = 3000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const showToast = useCallback(
    (msg) => {
      // 이미 떠있는 토스트 있으면 타이머 초기화
      if (timerRef.current) clearTimeout(timerRef.current);

      setMessage(msg);
      setIsVisible(true);

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    },
    [duration],
  );

  return { isVisible, message, showToast };
};
