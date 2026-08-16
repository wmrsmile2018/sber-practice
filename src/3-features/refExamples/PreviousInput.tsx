import { useRef, useEffect, type ChangeEvent, type FC, useState } from 'react';

export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export const PreviousInput: FC = () => {
  const [value, setValue] = useState('');
  const prevValue = usePrevious(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <p style={{ fontSize: '14', fontWeight: 'bold' }}>PreviousInput</p>
      <input type='text' onChange={handleChange} />
      <p>Предыдущее значение: {prevValue ?? ''}</p>
    </div>
  );
};
