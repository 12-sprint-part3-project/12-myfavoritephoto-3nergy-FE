import { MAXIMUM_PRICE, MAXIMUM_QUANTITY } from '@/constants/card';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9_-]+$/;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;']/;
const RESERVED_NICKNAMES = [
  'system',
  'admin',
  'administrator',
  'root',
  'null',
  'undefined',
  '관리자',
  '운영자',
];

// 회원가입 이메일 validate
export const validateEmail = (value) => {
  if (!value) {
    return '이메일을 입력해 주세요.';
  }

  if (!EMAIL_REGEX.test(value)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  return '';
};

// 회원가입 닉네임 validate
export const validateNickname = (value) => {
  if (!value) {
    return '닉네임을 입력해 주세요.';
  }

  if (value.length < 2 || value.length > 10) {
    return '닉네임은 2자 이상 10자 이하로 입력해 주세요.';
  }

  if (!NICKNAME_REGEX.test(value)) {
    return '닉네임은 한글, 영문, 숫자, -, _ 만 사용할 수 있습니다.';
  }

  if (RESERVED_NICKNAMES.includes(value.toLowerCase())) {
    return '이미 사용 중인 닉네임입니다.';
  }

  return '';
};

// 회원가입 비밀번호 validate
export const validatePassword = (value) => {
  if (!value) {
    return '비밀번호를 입력해 주세요.';
  }

  if (/\s/.test(value)) {
    return '비밀번호는 공백을 포함할 수 없습니다.';
  }

  if (value.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }

  if (!PASSWORD_UPPERCASE_REGEX.test(value)) {
    return '비밀번호는 대문자를 1자 이상 포함해야 합니다.';
  }

  if (!PASSWORD_SPECIAL_CHAR_REGEX.test(value)) {
    return '비밀번호는 특수문자를 1자 이상 포함해야 합니다.';
  }

  return '';
};

// 회원가입 비밀번호 확인 validate
export const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) {
    return '비밀번호를 한번 더 입력해 주세요.';
  }

  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return '';
};

export const validatePrice = (value) => {
  if (value < 1 || !value) {
    return '가격은 1P 이상 입력해 주세요.';
  }

  if (value > MAXIMUM_PRICE) {
    return '21억 이하로 입력해 주세요';
  }

  return '';
};

// 교환 희망, 카드 설명 정보
export const validateDescription = (value) => {
  if (!value.trim()) {
    return '설명을 입력해주세요.';
  }
  if (value.length > 300) {
    return '300자 이하로 입력해 주세요.';
  }
  return '';
};

// 카드이름 validate
export const validateCardName = (value) => {
  if (!value.trim()) {
    return '포토카드 이름을 입력해 주세요.';
  }

  if (value.length > 20) {
    return '20자 이하로 입력해 주세요.';
  }

  return '';
};

// 등급 validate
export const validateGrade = (value) => {
  if (!value) {
    return '등급을 선택해 주세요.';
  }

  return '';
};

// 장르 validate
export const validateGenre = (value) => {
  if (!value) {
    return '장르를 선택해 주세요.';
  }

  return '';
};

// 수량 min, max validate
export const validateQuantity = (value) => {
  if (!value) {
    return '최소 1장은 등록해야 합니다.';
  }
  if (value > MAXIMUM_QUANTITY) {
    return '총 발행량은 10장 이하로 선택 가능합니다.';
  }

  return '';
};

export const validateImgFile = (value) => {
  if (!value) {
    return '사진을 업로드해 주세요.';
  }

  return '';
};
