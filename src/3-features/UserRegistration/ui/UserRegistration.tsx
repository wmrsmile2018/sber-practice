import { memo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      socialLinks: [{ url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
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

      <div className={styles.socialLinksSection}>
        <p className={styles.sectionLabel}>Социальные ссылки</p>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.socialLinkRow}>
            <FormField
              label={`Ссылка ${index + 1}`}
              name={`socialLinks.${index}.url`}
              error={errors.socialLinks?.at?.(index)?.url?.message}
            >
              <input
                type='url'
                className={styles.input}
                placeholder='https://github.com/username'
                {...register(`socialLinks.${index}.url`)}
              />
            </FormField>
            <button
              type='button'
              className={styles.removeButton}
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              title='Удалить ссылку'
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type='button'
          className={styles.addButton}
          onClick={() => append({ url: '' })}
        >
          + Добавить ссылку
        </button>
      </div>

      <button type='submit' className={styles.submitButton}>
        Зарегистрироваться
      </button>
    </form>
  );
});
