export const validatePrice = (value) => {
  if (value < 1 || !value) {
    return '가격은 1P 이상 입력해주세요.';
  }
  return '';
};

// 교환 희망, 카드 설명 정보
export const validateDescription = (value) => {
  if (!value.trim()) {
    return '설명을 입력해주세요.';
  }
  if (value.length > 300) {
    return '300자 이하로 입력해주세요.';
  }
  return '';
};

// 카드이름 validate
export const validateCardName = (value) => {
  if (!value.trim()) {
    return '포토카드 이름을 입력해 주세요.';
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
  if (value > 10) {
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
