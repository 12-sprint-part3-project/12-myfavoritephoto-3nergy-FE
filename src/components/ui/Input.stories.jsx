// Input.stories.js
import { Input } from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    labelClassName: {
      control: 'text',
      description: 'label 텍스트 스타일',
      table: { type: { summary: 'string' } },
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

// ── Text (기본)
export const Text = {
  args: {
    label: '포토카드 이름',
    name: 'cardName',
    type: 'text',
    placeholder: '포토카드 이름을 입력해 주세요',
  },
};

export const TextFilled = {
  args: {
    ...Text.args,
    value: '우리집 앞마당',
  },
};

export const TextError = {
  args: {
    ...Text.args,
    value: '우리집 앞마당 우리집 앞마당 우리집 앞마당',
    error: '포토카드 이름은 최대 30자까지 입력 가능합니다.',
  },
};

export const TextDisabled = {
  args: {
    ...Text.args,
    disabled: true,
  },
};

// ── Email
export const Email = {
  args: {
    label: '이메일',
    name: 'email',
    type: 'email',
    placeholder: '이메일을 입력해 주세요',
  },
};

export const EmailFilled = {
  args: {
    ...Email.args,
    value: 'euz@photo.com',
  },
};

export const EmailError = {
  args: {
    ...Email.args,
    value: 'euzphoto',
    error: '이메일 형식이 아닙니다.',
  },
};

// ── Password
export const Password = {
  args: {
    label: '비밀번호',
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요',
  },
};

export const PasswordFilled = {
  args: {
    ...Password.args,
    value: 'photo1234',
  },
};

export const PasswordError = {
  args: {
    ...Password.args,
    value: 'choco',
    error: '비밀번호가 일치하지 않습니다.',
  },
};

export const PasswordDisabled = {
  args: {
    ...Password.args,
    disabled: true,
  },
};
