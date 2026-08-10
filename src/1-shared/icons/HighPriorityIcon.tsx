import type { FC } from 'react';

export const HighPriorityIcon: FC<{ className?: string }> = ({ className }) => {
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
        d='M12 3L22 21H2L12 3Z'
        fill='#f93c3c'
        stroke='#f93c3c'
        stroke-width='2'
        stroke-linejoin='round'
      />
      <path
        d='M12 9V14'
        stroke='#fff'
        stroke-width='2'
        stroke-linecap='round'
      />
      <circle cx='12' cy='17' r='1' fill='#FFFFFF' />
    </svg>
  );
};
