import Textarea from './Textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  argTypes: {
    label: {
      control: 'text',
      order: 1,
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      order: 2,
      table: {
        type: { summary: 'string' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    label: '카드 설명',
    name: 'description',
    placeholder: '카드 설명을 입력해 주세요',
  },
};

export const Filled = {
  args: {
    ...Default.args,
    value:
      '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.',
  },
};

export const Overflow = {
  args: {
    ...Default.args,
    value:
      '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 텍스트가 넘칠 때 박스는 고정하고 스크롤로 처리',
  },
};
