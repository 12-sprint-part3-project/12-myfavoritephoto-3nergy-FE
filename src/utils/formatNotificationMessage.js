import { GRADE_STYLE } from '@/constants/card';

const gradeLabel = (grade) => GRADE_STYLE[grade]?.label ?? grade;
const cardLabel = (photocard) =>
  photocard ? `${gradeLabel(photocard.grade)} | ${photocard.name}` : '';

export const formatNotificationMessage = ({
  type,
  actor,
  photocard,
  quantity,
}) => {
  const card = cardLabel(photocard);
  const nickname = actor?.nickname ?? '';

  const map = {
    PURCHASE_COMPLETED: `[${card}] ${quantity}장을 성공적으로 구매했습니다.`,
    SALE_COMPLETED: `${nickname}님이 [${card}]을 ${quantity}장 구매했습니다.`,
    SOLD_OUT: `[${card}]이 품절되었습니다.`,
    TRADE_CANCELED_BY_SOLD_OUT: `[${card}]이 품절되어 교환 제시가 취소되었습니다.`,
    TRADE_PROPOSED: `${nickname}님이 [${card}]의 포토카드 교환을 제안했습니다.`,
    TRADE_CANCELED: `${nickname}님이 [${card}]의 포토카드 교환 제안을 취소했습니다.`,
    TRADE_ACCEPTED: `${nickname}님과의 [${card}]의 포토카드 교환이 성사되었습니다.`,
    TRADE_REJECTED: `${nickname}님이 [${card}]의 교환 제안을 거절했습니다.`,
    SALE_STOPPED: `교환을 제안한 [${card}]의 판매가 중단되었습니다.`,
    SALE_UPDATED: `교환을 제안한 [${card}]의 판매 정보가 수정되었습니다.`,
  };

  return map[type] ?? '새로운 알림이 있습니다.';
};
