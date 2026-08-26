import s from './Price.module.css';

type PriceProps = {
  price: number;
  discountPrice: number;
};
export const Price = ({ price, discountPrice }: PriceProps) => {
  return (
    <div className={s['price']}>
      <span className={s['price_old']}>{price} ₽</span>
      <span className={s['price_discount']}>{discountPrice} ₽</span>
    </div>
  );
};
