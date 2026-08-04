import type { FC } from 'react';

export const LowPriorityIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns='http://w3.org'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className={className}
    >
      <path d='m7 13 5 5 5-5M7 6l5 5 5-5' />
    </svg>
  );
};
