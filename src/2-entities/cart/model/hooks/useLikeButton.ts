import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'shared/store/utils';
import { userSelectors } from 'shared/store/slices';
import {
  useSetLikeProductMutation,
  useDeleteLikeProductMutation,
  IErrorResponse,
} from 'shared/store/api';

export const useLikeButton = (product: Product) => {
  const accessToken = useAppSelector(userSelectors.getAccessToken);
  const user = useAppSelector(userSelectors.getUser);

  const [setLike] = useSetLikeProductMutation();
  const [deleteLike] = useDeleteLikeProductMutation();

  const isLike = product?.likes.some((l) => l.userId === user?.id);

  const toggleLike = useCallback(async () => {
    if (!accessToken) {
      toast.warning('Вы не авторизованы');
      return;
    }
    let response;
    if (isLike) {
      response = await deleteLike({ id: `${product.id}` });
    } else {
      response = await setLike({ id: `${product.id}` });
    }

    if (response.error) {
      const error = response.error as IErrorResponse;
      toast.error(error.data.message);
    }
  }, [accessToken, isLike, product.id, setLike, deleteLike]);

  return { isLike, toggleLike };
};
