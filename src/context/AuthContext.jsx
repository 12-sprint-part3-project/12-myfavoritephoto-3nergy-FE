'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { getToken, setToken, clearToken } from '@/utils/token';
import { LoginModal } from '@/components/domain/auth/LoginModal';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // 액세스 토큰 메모리 상태 (localStorage에서 초기값 복원)
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAccessToken(token);
      return;
    }

    // 소셜 로그인 후 refreshToken 쿠키가 있을 수 있으니 refresh 시도
    fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.accessToken) {
          setToken(data.data.accessToken);
          setAccessToken(data.data.accessToken);
        }
      })
      .catch(() => {});
  }, []);

  // 로그인 모달 타입: null | 'session-expired' | 'login-required'
  const [loginModalType, setLoginModalType] = useState(null);

  const openLoginModal = useCallback((type = 'login-required') => {
    setLoginModalType(type);
  }, []);

  const closeLoginModal = useCallback(() => {
    setLoginModalType(null);
  }, []);

  const login = (token) => {
    setAccessToken(token);
    setToken(token);
  };

  const logout = () => {
    setAccessToken(null);
    clearToken();
  };

  const handleLogin = () => {
    closeLoginModal();
    router.push('/login');
  };

  // queryClient.js에서 발생시킨 auth:error 이벤트 수신
  useEffect(() => {
    const handler = (e) => {
      const type = e.detail?.type;
      if (type === 'session-expired') {
        // 세션 만료 시 메모리 토큰도 정리 (localStorage는 queryClient에서 이미 정리)
        setAccessToken(null);
      }
      setLoginModalType(type ?? 'login-required');
    };

    window.addEventListener('auth:error', handler);
    return () => window.removeEventListener('auth:error', handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, openLoginModal }}
    >
      {children}
      {loginModalType && (
        <LoginModal
          type={loginModalType}
          onClose={closeLoginModal}
          onLogin={handleLogin}
        />
      )}
    </AuthContext.Provider>
  );
};

// AuthProvider 외부에서 사용 시 에러 발생시켜 잘못된 사용 방지
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  }
  return context;
};
