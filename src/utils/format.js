import { UNIT_KYUNG, UNIT_JO, UNIT_EOK, UNIT_MAN } from '@/constants/unit';

/**
 * @param {number} 포인트(2100000000 이하의 정수)
 * @returns {string} 한글(금액단위) 문자열
 */
export const displayKoreanNumber = (value) => {
  let rest = value;

  const kyung = Math.floor(rest / UNIT_KYUNG);
  rest %= UNIT_KYUNG;

  const jo = Math.floor(rest / UNIT_JO);
  rest %= UNIT_JO;

  const eok = Math.floor(rest / UNIT_EOK);
  rest %= UNIT_EOK;

  const man = Math.floor(rest / UNIT_MAN);
  rest %= UNIT_MAN;

  let result = '';
  if (kyung > 0) result += `${kyung.toLocaleString()}경 `;
  if (jo > 0) result += `${jo.toLocaleString()}조 `;
  if (eok > 0) result += `${eok.toLocaleString()}억 `;
  if (man > 0) result += `${man.toLocaleString()}만 `;
  if (rest > 0 || result === '') result += `${rest.toLocaleString()}`;

  return result.trim();
};
