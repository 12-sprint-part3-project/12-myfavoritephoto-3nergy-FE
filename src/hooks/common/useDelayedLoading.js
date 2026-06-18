import { useEffect, useRef, useState } from 'react';

export const useDelayedLoading = (isLoading, delay = 500) => {
  const [showLoading, setShowLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      timerRef.current = setTimeout(() => setShowLoading(true), delay);
    } else {
      clearTimeout(timerRef.current);
      setShowLoading(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [isLoading, delay]);

  return showLoading;
};
