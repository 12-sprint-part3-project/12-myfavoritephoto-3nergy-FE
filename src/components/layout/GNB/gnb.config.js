export const parseRoute = (pathname) => {
  const clean = pathname.replace(/^\/(ko|en)/, '').replace(/\/$/, '');
  const segments = clean.split('/').filter(Boolean);

  return {
    root: segments[0],
    id: segments[1],
    action: segments[2],
  };
};

export const getGnbConfig = (pathname) => {
  const { root, action } = parseRoute(pathname);

  if (root === 'marketplace' && action === 'edit') {
    return { title: '수정하기' };
  }

  if (root === 'marketplace') {
    return { title: '마켓플레이스' };
  }

  if (root === 'my-gallery') {
    return { title: '마이갤러리' };
  }

  if (root === 'my-sales') {
    return { title: '나의 판매 포토카드' };
  }

  return null;
};
