export const getOptimizedImageUrl = (url, width = 400) => {
  if (!url?.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/w_${width},f_webp,q_auto/`);
};
