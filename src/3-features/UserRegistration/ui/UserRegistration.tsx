import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from 'shared/ui-kit';
import {
  registrationSchema,
  type RegistrationFormValues,
} from '../model/schema';
import styles from './UserRegistration.module.css';

export const UserRegistration = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField label='Email' name='email' error={errors.email?.message}>
        <input type='email' className={styles.input} {...register('email')} />
      </FormField>

      <FormField
        label='Пароль'
        name='password'
        error={errors.password?.message}
      >
        <input
          type='password'
          className={styles.input}
          {...register('password')}
        />
      </FormField>

      <FormField
        label='Подтверждение пароля'
        name='confirmPassword'
        error={errors.confirmPassword?.message}
      >
        <input
          type='password'
          className={styles.input}
          {...register('confirmPassword')}
        />
      </FormField>

      <button type='submit' className={styles.submitButton}>
        Зарегистрироваться
      </button>
    </form>
  );
});
