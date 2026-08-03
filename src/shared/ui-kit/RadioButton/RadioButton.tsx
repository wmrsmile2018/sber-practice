import { memo, useReducer, type FC } from 'react';
import styles from './RadioButton.module.css';
import { ConfirmIcon } from '../../icons';

type RedioButtonProps = {
  variant?: 'circle' | 'rect';
  disabled?: boolean;
  value?: boolean;
  onChange?: (val: boolean) => void;
  title?: string;
};

export const RedioButton: FC<RedioButtonProps> = memo(
  ({ value, onChange, disabled, variant = 'circle' }) => {
    const [checked, toggle] = useReducer((state) => !state, value ?? false);

    const onClick = () => {
      if (disabled !== true) {
        toggle();
        onChange?.(!checked);
      }
    };

    return (
      <div
        onClick={onClick}
        className={`${styles.container} ${variant === 'circle' ? styles.circle : styles.rect} ${checked ? 'checked' : ''}`}
      >
        {variant === 'rect' && checked && <ConfirmIcon />}
        {variant === 'circle' && checked && <div className={styles.dot} />}
      </div>
    );
  }
);
