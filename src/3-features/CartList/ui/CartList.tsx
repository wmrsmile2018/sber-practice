import { CartItem } from 'entities/cart';
import s from './CartList.module.css';
import classNames from 'classnames';
import { memo } from 'react';

type CartListProps = {
  products: CartProduct[];
};
export const CartList = memo(({ products }: CartListProps) => {
  return (
    <div className={classNames(s['cart-list'])}>
      {products.map((p) => (
        <CartItem product={p} key={p.id} />
      ))}
    </div>
  );
});
