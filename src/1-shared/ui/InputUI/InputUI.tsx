import {
  CSSProperties,
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useState,
} from 'react';
import s from './InputUI.module.css';
import classNames from 'classnames';

export type InputUIProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  dynamicLabel?: boolean;
  withBorder?: boolean;
  style?: CSSProperties;
  name?: string;
};

export const InputUI: FC<InputUIProps> = ({
  value,
  onChange,
  label,
  disabled,
  placeholder,
  dynamicLabel,
  withBorder = true,
  style,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(true);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(false);
  };

  const isFloating = dynamicLabel && (isFocused || !!value);

  return (
    <div className={s.inputWrapper} style={style}>
      {label && ((!dynamicLabel && !value) || dynamicLabel) && (
        <span
          className={classNames(s.inputLabel, {
            [s['inputLabel--floating']]: isFloating,
            [s['inputLabel--static']]: !dynamicLabel,
          })}
        >
          {label}
        </span>
      )}
      <input
        className={classNames(s.input, {
          [s['input--noBorder']]: !withBorder,
        })}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={!dynamicLabel ? placeholder || label : ''}
        name={name}
      />
    </div>
  );
};
