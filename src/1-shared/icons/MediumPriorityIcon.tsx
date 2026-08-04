import type { FC } from 'react';

export const MediumPriorityIcon: FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg
      xmlns='http://w3.org'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill='none'
      className={className}
    >
      <path
        d='M5 9h14M5 15h14'
        stroke='#F59E0B'
        stroke-width='3'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
