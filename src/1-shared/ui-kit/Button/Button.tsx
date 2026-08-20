import { memo, type FC } from 'react';
import styles from './Button.module.css';
import type { ElementBaseCssProps } from 'shared/types';

type ButtonProps = ElementBaseCssProps & {
  onClick?: VoidFunction;
  disabled?: boolean;
  children: string;
  variant: 'primary' | 'secondary';
};

export const Button: FC<ButtonProps> = memo(
  ({ children, variant, disabled, onClick, className, ...rest }) => {
    return (
      <div
        {...rest}
        className={`${className ?? ''} ${styles.container} ${variant === 'primary' ? styles.primary : styles.secondary}`}
      >
        <button onClick={onClick} disabled={disabled}>
          {children}
        </button>
      </div>
    );
  },
);
