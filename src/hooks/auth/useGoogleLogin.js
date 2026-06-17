import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { googleLogin } from '@/services/auth';
import { setToken } from '@/utils/token';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const useGoogleLogin = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const mutateRef = useRef(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (idToken) => {
      if (!idToken) throw new Error('Google 로그인을 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.');
      return googleLogin({ idToken });
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      authLogin(data.accessToken);
      router.push('/');
    },
  });

  mutateRef.current = mutate;

  useEffect(() => {
    const init = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => mutateRef.current(response.credential),
        cancel_on_tap_outside: false,
        use_fedcm_for_prompt: false,
      });
    };

    if (window.google?.accounts?.id) {
      init();
      return;
    }

    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = init;
    document.head.appendChild(script);
  }, []);

  const loginWithGoogle = () => {
    if (!window.google) return;
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        const reason = notification.getNotDisplayedReason();
        if (['unregistered_origin', 'invalid_client', 'missing_client_id'].includes(reason)) {
          mutateRef.current(null);
        }
      }
    });
  };

  return { loginWithGoogle, isPending, error };
};
