import classNames from 'classnames';
import s from './Card.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/store/utils';
import { cartSelectors } from 'shared/store/slices';
import { memo } from 'react';
import { useAddToCart } from 'entities/cart/model';
import { LikeButton } from '../../LikeButton';
import { CartCounter } from '../../CartCounter';
import { Price } from 'shared/ui/Price';

type CardProps = {
  product: Product;
};
export const Card = memo(({ product }: CardProps) => {
  const { discount, price, name, id, images } = product;
  const cartProducts = useAppSelector(cartSelectors.getCartProducts);
  const isProductInCart = cartProducts.some((p) => p.id === id);
  const { addProductToCart } = useAddToCart();

  return (
    <div className={s['card']}>
      <div
        className={classNames(
          s['card__sticky'],
          s['card__sticky_type_top-left'],
        )}
      >
        <span className={s['card__discount']}>{discount}</span>
      </div>
      <div
        className={classNames(
          s['card__sticky'],
          s['card__sticky_type_top-right'],
        )}
      >
        <LikeButton product={product} />
      </div>
      <Link className={s['card__link']} to={`/products/${id}`}>
        <img
          src={images}
          alt={name}
          className={s['card__image']}
          loading='lazy'
        />
        <div className={s['card__desc']}>
          <Price price={price} discountPrice={discount} />
          <h3 className={s['card__name']}>{name}</h3>
        </div>
      </Link>
      {isProductInCart ? (
        <CartCounter productId={id} />
      ) : (
        <button
          onClick={() => addProductToCart({ ...product, count: 1 })}
          disabled={isProductInCart}
          className={classNames(
            s['card__cart'],
            s['card__btn'],
            s['card__btn_type_primary'],
          )}
        >
          В корзину
        </button>
      )}
    </div>
  );
});
