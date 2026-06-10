export const QUERY_CONFIG = {
  staleTime: {
    DEFAULT: 1000 * 60, // 1분
    SHORT: 1000 * 30, // 30초 (알림 등 자주 바뀌는 데이터)
    LONG: 1000 * 60 * 5, // 5분 (잘 안 바뀌는 데이터)
  },
  gcTime: {
    DEFAULT: 1000 * 60 * 5, // 5분
  },
};
