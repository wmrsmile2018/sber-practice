import { z } from 'zod';

export const registrationSchema = z
  .object({
    email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
    password: z
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .min(1, 'Пароль обязателен'),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
    socialLinks: z
      .array(
        z.object({
          url: z
            .string()
            .url('Некорректный URL')
            .min(1, 'URL обязателен'),
        }),
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
