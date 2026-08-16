import { useRef, type FC } from 'react';

export const FocusTracker: FC = () => {
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const focusCountRef = useRef<number>(0);

  const handleFocus = () => {
    focusCountRef.current += 1;
    console.log(`Переходов фокуса между полями: ${focusCountRef.current}`);
  };

  const handleFocusFirst = () => {
    input1Ref.current?.focus();
  };

  return (
    <div>
      <p style={{ fontSize: '14', fontWeight: 'bold' }}>FocusTracker</p>
      <input
        ref={input1Ref}
        type='text'
        placeholder='Первое поле'
        onFocus={handleFocus}
      />
      <input
        ref={input2Ref}
        type='text'
        placeholder='Второе поле'
        onFocus={handleFocus}
      />
      <button onClick={handleFocusFirst}>Сфокусировать на первом</button>
    </div>
  );
};
