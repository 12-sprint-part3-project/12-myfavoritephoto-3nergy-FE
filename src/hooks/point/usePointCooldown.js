import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPointEventStatus } from '@/services/point';
import { SECOND } from '@/constants/time';

const fetchEventStatus = async () => {
  const status = await getPointEventStatus();

  return {
    ...status,
    cooldownEndAt: status.canDraw
      ? null
      : Date.now() + status.remainingMilliseconds,
  };
};

export const usePointCooldown = (uuid, onExpire) => {
  const queryClient = useQueryClient();
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.point.eventStatus(),
    queryFn: fetchEventStatus,
    enabled: Boolean(uuid),
  });

  const cooldownEndAt = data?.cooldownEndAt;
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!cooldownEndAt) {
      return;
    }

    const tick = () => {
      const remaining = cooldownEndAt - Date.now();
      setCountdown(Math.max(remaining, 0));

      if (remaining <= 0) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.point.eventStatus(),
        });
        onExpireRef.current?.();
      }
    };

    tick();
    const intervalId = setInterval(tick, SECOND);
    return () => clearInterval(intervalId);
  }, [cooldownEndAt, queryClient]);

  const saveCooldown = (remainingMilliseconds) => {
    queryClient.setQueryData(QUERY_KEYS.point.eventStatus(), (prev) => ({
      ...prev,
      canDraw: false,
      remainingMilliseconds,
      cooldownEndAt: Date.now() + remainingMilliseconds,
    }));
  };

  return {
    // undefined: 초기 조회 전 | null: 쿨다운 없음(뽑기 가능) | number: 쿨다운 종료 시각(timestamp)
    cooldownEndAt: isLoading ? undefined : cooldownEndAt,
    countdown,
    saveCooldown,
  };
};
