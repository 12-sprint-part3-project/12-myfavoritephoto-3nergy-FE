import { BasicModal } from '@/components/ui/BasicModal';

// type에 따라 문구 분기 처리
const MODAL_CONTENT = {
  'session-expired': {
    title: '세션이 만료되었습니다',
    description: '안전한 사용을 위해 다시 로그인해주세요.',
  },
  'login-required': {
    title: '로그인이 필요합니다',
    description: '로그인 후 이용할 수 있습니다.',
  },
};

export const LoginModal = ({ type, onClose, onLogin }) => {
  const { title, description } = MODAL_CONTENT[type];

  return (
    <BasicModal
      title={title}
      buttonText="로그인"
      onClose={onClose}
      onClick={onLogin}
    >
      {description}
    </BasicModal>
  );
};
