import { CSSProperties, FC, PropsWithChildren } from 'react';
import s from './Button.module.css';
import classNames from 'classnames';

type ButtonUIProps = PropsWithChildren & {
  variant: 'filled' | 'icon' | 'ghost' | 'border';
  level: 'primary' | 'secondary';
  style?: CSSProperties;
  onClick?: VoidFunction;
  disabled?: boolean;
};

export const ButtonUI: FC<ButtonUIProps> = ({
  variant,
  disabled,
  onClick,
  style,
  children,
  level,
}) => {
  return (
    <button
      className={classNames(
        s['_button'],
        s[variant],
        s[level],
        s[disabled ? '_dislabed' : ''],
      )}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};
