import { useState, useEffect, useMemo, useRef } from 'react';
import { getPointLocalKey } from '@/utils/pointStorage';
import { SECOND } from '@/constants/time';

const getStoredNextAt = (key) => {
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  const nextAt = new Date(saved).getTime();
  return nextAt > Date.now() ? nextAt : null;
};

export const usePointCooldown = (uuid, onExpire) => {
  const localKey = uuid ? getPointLocalKey(uuid) : null;
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  const storedNextAt = useMemo(
    () => (localKey ? getStoredNextAt(localKey) : undefined),
    [localKey],
  );

  const [apiNextAt, setApiNextAt] = useState(null);
  const [countdown, setCountdown] = useState(0);

  // undefined = 아직 초기화 전 | null = 쿨다운 없음 | number = 쿨다운 중
  const nextAvailableAt =
    storedNextAt === undefined ? undefined : apiNextAt === 0 ? null : apiNextAt ?? storedNextAt;

  useEffect(() => {
    if (!nextAvailableAt) return;

    const tick = () => {
      const remaining = nextAvailableAt - Date.now();
      if (remaining <= 0) {
        setCountdown(0);
        setApiNextAt(0);
        if (localKey) localStorage.removeItem(localKey);
        onExpireRef.current?.();
      } else {
        setCountdown(remaining);
      }
    };

    const immediateId = setTimeout(tick, 0);
    const intervalId = setInterval(tick, SECOND);
    return () => {
      clearTimeout(immediateId);
      clearInterval(intervalId);
    };
  }, [nextAvailableAt, localKey]);

  const saveCooldown = (nextAvailableAtStr) => {
    const nextAt = new Date(nextAvailableAtStr).getTime();
    if (localKey) localStorage.setItem(localKey, nextAvailableAtStr);
    setApiNextAt(nextAt);
  };

  return { nextAvailableAt, countdown, saveCooldown };
};
