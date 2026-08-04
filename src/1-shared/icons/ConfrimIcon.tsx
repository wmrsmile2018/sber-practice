import type { FC } from 'react';

export const ConfirmIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns='http://w3.org'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='4'
      stroke-linecap='round'
      stroke-linejoin='round'
      className={className}
    >
      <polyline points='20 6 9 17 4 12'></polyline>
    </svg>
  );
};
