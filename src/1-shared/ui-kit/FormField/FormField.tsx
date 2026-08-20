import React, { type FC } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string;
}

export const FormField: FC<FormFieldProps> = ({
  label,
  name,
  error,
  children,
  className,
}) => {
  return (
    <div
      className={`${styles.field} ${error ? styles.fieldError : ''} ${className || ''}`}
    >
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
