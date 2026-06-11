export const validatePrice = (value) => {
  if (!value || value < 1) {
    return '가격은 1P 이상 입력해주세요.';
  }

  return '';
};

// 교환 희망 정보
export const validateDescription = (value) => {
  if (value.length > 300) {
    return '300자 이하로 입력해주세요.';
  }
  if (!value.trim()) {
    return '설명을 입력해주세요.';
  }
  return '';
};
