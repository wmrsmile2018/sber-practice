import { useCallback, useMemo, ChangeEvent } from 'react';
import { cartActions, cartSelectors } from 'shared/store/slices';
import { useAppDispatch, useAppSelector } from 'shared/store/utils';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(cartSelectors.getCartProducts);
  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId],
  ) as CartProduct | undefined;

  const { id, count, stock } = product || { id: '', count: 1, stock: 1 };

  const handleIncrement = useCallback(() => {
    const newCount = count + 1;
    const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
    dispatch(cartActions.setCartProductCount({ id, count: validCount }));
  }, [id, count, dispatch]);

  const handleDecrement = useCallback(() => {
    const newCount = count - 1;
    const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
    dispatch(cartActions.setCartProductCount({ id, count: validCount }));
  }, [id, count, dispatch]);

  const handleSetCount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        cartActions.setCartProductCount({
          id,
          count: Number(e.target.value),
        }),
      );
    },
    [id, dispatch],
  );

  return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
