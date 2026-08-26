import s from './LikeButton.module.css';
import classNames from 'classnames';
import { useLikeButton } from '../../../model/hooks/useLikeButton';
import { LikeUIIcon } from 'shared/assets';

type TLikeButtonProps = {
  product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
  const { isLike, toggleLike } = useLikeButton(product);

  return (
    <button
      className={classNames(s['card__favorite'], {
        [s['card__favorite_is-active']]: isLike,
      })}
      onClick={toggleLike}
    >
      <LikeUIIcon />
    </button>
  );
};
