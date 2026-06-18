export const getNotificationPath = ({ targetType, targetId }) => {
  switch (targetType) {
    case 'SALE_DETAIL':
      return `/marketplace/${targetId}`;
    case 'MY_SALE_PAGE':
      return `/my-sales`;
    case 'MY_GALLERY':
      return `/my-gallery`;
    default:
      return '/my-notifications';
  }
};
