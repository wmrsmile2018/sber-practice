import s from './CartPage.module.css';
import classNames from 'classnames';
import { useAppSelector } from 'shared/store/utils';
import { cartSelectors } from 'shared/store/slices';
import { CartAmount } from 'entities/cart';
import { CartList } from 'features/CartList';
import { memo } from 'react';

export const CartPage = memo(() => {
  const products = useAppSelector(cartSelectors.getCartProducts);

  if (!products.length) {
    return <h1 className='header-title'>Товаров нет корзине</h1>;
  }

  return (
    <div className={classNames(s['content'], s['container'])}>
      <div className={classNames(s['content-cart'])}>
        <div className={classNames(s['cart-title'])}>
          <span>{products.length}</span> в корзине
        </div>
        <CartList products={products} />
        <CartAmount products={products} />
      </div>
    </div>
  );
});
