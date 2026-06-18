import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { createPhotocard } from '@/services/photocard';

export const useCreatePhotocard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPhotocard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myGallery.all() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.photocards.all() });
    },
  });
};
