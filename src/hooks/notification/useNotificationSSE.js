import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useNotificationSSE = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      return; // 비로그인이면 연결 안 함
    }

    let active = true;
    let reader = null;

    const connect = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/subscribe`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (active) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          // 청크가 쪼개져 올 수 있어서 buffer로 누적 후 처리
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();

          let event = '';
          for (const line of lines) {
            if (line.startsWith('event:')) {
              event = line.replace('event:', '').trim();
            } else if (line.startsWith('data:')) {
              const data = line.replace('data:', '').trim();
              if (event === 'notification') {
                try {
                  const notification = JSON.parse(data);
                  queryClient.setQueryData(
                    QUERY_KEYS.notifications.all(),
                    (old) => ({
                      notifications: [
                        notification,
                        ...(old?.notifications ?? []),
                      ],
                    }),
                  );
                } catch (e) {
                  console.error('알림 파싱 실패:', e);
                }
              }
              event = '';
            }
          }
        }
      } catch (err) {
        if (active) {
          console.error('SSE 연결 오류:', err);
        }
      }
    };

    connect();

    return () => {
      active = false;
      reader?.cancel();
    };
  }, [accessToken, queryClient]);
};
