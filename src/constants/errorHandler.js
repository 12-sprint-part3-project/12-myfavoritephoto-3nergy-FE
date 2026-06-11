// 백엔드 에러 코드별 프론트 처리 방식 정의
// action: 'toast' | 'session-expired' | 'login-required' | 'refresh'
// 정의되지 않은 에러 코드는 error.message를 그대로 toast로 표시
export const ERROR_HANDLER = {
  // 로그인하지 않은 상태에서 인증이 필요한 요청 호출 → 로그인 모달
  UNAUTHORIZED: {
    action: 'login-required',
  },
  ACCESS_TOKEN_MISSING: {
    action: 'login-required',
  },

  // 액세스 토큰 만료 → fetchWithAuth에서 자동 재발급 처리
  ACCESS_TOKEN_EXPIRED: {
    action: 'refresh',
  },

  // 토큰이 유효하지 않거나 리프레시 토큰 만료 → 세션 만료 처리
  REFRESH_TOKEN_EXPIRED: {
    action: 'session-expired',
  },
  INVALID_REFRESH_TOKEN: {
    action: 'session-expired',
  },
  INVALID_ACCESS_TOKEN: {
    action: 'session-expired',
  },

  // 서버 에러 → 사용자 친화적 메시지로 변경
  INTERNAL_SERVER_ERROR: {
    message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    action: 'toast',
  },
  GOOGLE_CONFIG_MISSING: {
    message: '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
    action: 'toast',
  },

  // 회원가입 시 입력 필드 자체에 인라인으로 표시 → 전역 토스트 X
  EMAIL_ALREADY_EXISTS: {
    action: 'field',
  },
  NICKNAME_ALREADY_EXISTS: {
    action: 'field',
  },
};

export const getErrorHandler = (code) => {
  return ERROR_HANDLER[code] ?? { action: 'toast' };
};
