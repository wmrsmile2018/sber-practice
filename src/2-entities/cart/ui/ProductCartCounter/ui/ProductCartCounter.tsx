import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useAddToCart } from 'entities/cart';
import { useState, ChangeEvent } from 'react';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

type ProductCartCounterProps = {
  product: Product;
};
export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
  const [count, setCount] = useState(1);

  const handleCount = (e: ChangeEvent<HTMLInputElement>) => {
    const newCount = +e.target.value;
    const validCount =
      newCount > MAX_COUNT
        ? MAX_COUNT
        : newCount < MIN_COUNT
          ? MIN_COUNT
          : newCount;
    setCount(validCount);
  };
  const handleCountMinus = () => {
    const newCount = count - 1;
    const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
    setCount(validCount);
  };
  const handleCountPlus = () => {
    const newCount = count + 1;
    const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
    setCount(validCount);
  };

  const { addProductToCart } = useAddToCart();

  return (
    <div className={classNames('product__btn-wrap')}>
      <div className={s['button-count']}>
        <button className={s['button-count__minus']} onClick={handleCountMinus}>
          -
        </button>
        <input
          type='number'
          className={s['button-count__num']}
          value={count}
          onChange={handleCount}
        />
        <button className={s['button-count__plus']} onClick={handleCountPlus}>
          +
        </button>
      </div>
      <button
        onClick={() => addProductToCart({ ...product, count })}
        className={classNames(s['button'], s['button_type_primary'])}
      >
        В корзину
      </button>
    </div>
  );
};
