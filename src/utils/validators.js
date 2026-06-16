export const validatePrice = (value) => {
  if (value < 1 || !value) {
    return '가격은 1P 이상 입력해주세요.';
  }
  return '';
};

// 교환 희망 정보
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
/**
 *
 * @param {*} value
 * @returns
 */
export const validateQuantity = (value) => {
  if (!value) {
    return '최소 1장은 등록해야 합니다.';
  }
  if (value > 10) {
    return '총 발행량은 10장 이하로 선택 가능합니다.';
  }

  return '';
};

/**
 * textarea ( 희망 설명, 제시 내용 ) 필드 validate
 * @param {string} value 입력값
 * @param {string} label textarea label
 * @param {boolean} [required=false] 필수입력 여부(선택)
 * @returns {string}
 */
export const validateTextarea = (value, label, required = false) => {
  if (!value.trim()) {
    return required ? `${label}을(를) 입력해주세요.` : '';
  }

  return '';
};

export const validateImgFile = (value) => {
  if (!value) {
    return '사진을 업로드해 주세요.';
  }

  return '';
};
