import { ReactNode } from 'react';
import s from './AnchorUI.module.css';
import { CSSProperties } from '@mui/material';
import classNames from 'classnames';

export type AnchorUIProps = {
  targetComponent: ReactNode;
  srcComponent: ReactNode;
  horizontalPosition: 'left' | 'right';
  verticalPosition: 'top' | 'bottom';
  className?: string;
  style?: CSSProperties;
};

export const AnchorUI = ({
  targetComponent,
  srcComponent,
  horizontalPosition,
  verticalPosition,
  className,
  style,
}: AnchorUIProps) => {
  const positionClass =
    s[`anchorSrc--${horizontalPosition}-${verticalPosition}`];

  return (
    <div
      className={`${classNames(s['anchorWrapper'])} ${className}`}
      style={style}
    >
      <div className={s.anchorTarget}>{targetComponent}</div>
      <div className={`${s.anchorSrc} ${positionClass}`}>{srcComponent}</div>
    </div>
  );
};
