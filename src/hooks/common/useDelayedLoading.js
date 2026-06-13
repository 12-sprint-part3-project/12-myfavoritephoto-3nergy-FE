import { useEffect, useState } from 'react';

export const useDelayedLoading = (isLoading, delay = 300) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timer = setTimeout(() => {
      setShowLoading(true);
    }, delay);

    return () => {
      clearTimeout(timer);
      setShowLoading(false);
    };
  }, [isLoading, delay]);

  return showLoading;
};
