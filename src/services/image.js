/**
 * 이미지를 Cloudinary에 업로드하고 URL을 반환한다.
 * @param {File} file
 * @returns {Promise<string>} Cloudinary secure URL
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  const { url } = await response.json();
  return url;
};
