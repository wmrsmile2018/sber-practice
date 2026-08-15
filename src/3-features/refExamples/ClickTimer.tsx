import { useEffect, useRef, type FC } from 'react';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer: FC = () => {
  const clickRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();

    if (clickRef.current.startTime === null) {
      clickRef.current.startTime = now;
    }

    clickRef.current.clickCount += 1;

    const dif = now - clickRef.current.startTime;

    console.log(`Время с первого клика: ${dif} мс`);
    console.log(`Количество кликов: ${clickRef.current.clickCount}`);
  };

  console.log('hello');
  useEffect(() => {
    console.log('rerender');
  }, []);

  return (
    <div>
      <p style={{ fontSize: '14', fontWeight: 'bold' }}>ClickTimer</p>
      <button onClick={handleClick}>Кликни меня</button>
    </div>
  );
};
