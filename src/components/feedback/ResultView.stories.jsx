import { ResultView } from './ResultView';

const meta = {
  title: 'Feedback/ResultView',
  component: ResultView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      description: '결과 화면 제목',
    },
    isSuccess: {
      description: '성공 여부',
      control: 'boolean',
    },
    description: {
      description: '결과 메시지',
    },
    subDescription: {
      description: '실패할 경우 추가 에러 메시지',
    },
    buttonText: {
      description: '하단 버튼 문구',
    },
    onClick: {
      description: '페이지 이동 경로',
      action: 'clicked',
    },
  },
};

export default meta;

export const Success = {
  args: {
    title: '판매 등록',
    isSuccess: true,
    description: '[COMMON | 우리집 앞마당] 3장 판매 등록이 완료되었습니다.',
    buttonText: '나의 판매 포토카드에서 확인하기',
  },
};

export const Failure = {
  args: {
    title: '판매 등록',
    isSuccess: false,
    description: '[COMMON | 우리집 앞마당] 3장 판매 등록이 실패했습니다.',
    subDescription: '보유 수량보다 많은 수량을 등록할 수 없습니다.',
    buttonText: '마켓플레이스로 돌아가기',
  },
};
