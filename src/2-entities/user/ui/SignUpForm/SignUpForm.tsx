import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from './validator';
import { SignUpFormValues, useSignUpMutation } from 'shared/store/api';
import { getMessageFromError } from 'shared/utils';
import { userActions } from 'shared/store/slices';
import { ButtonUI } from 'shared/ui';
import s from './SignUpForm.module.css';

export const SignUpForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpRequestFn] = useSignUpMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpFormSchema),
  });

  const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
    try {
      const response = await signUpRequestFn(values).unwrap();

      dispatch(userActions.setUser(response.user));
      dispatch(
        userActions.setAccessToken({ accessToken: response.accessToken }),
      );

      toast.success('Вы успешно зарегистрированы!');
      navigate('/');
    } catch (error) {
      console.log({ error });
      toast.error(
        getMessageFromError(
          error,
          'Не известная ошибка при регистрации пользователя',
        ),
      );
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                margin='normal'
                label='Email Address'
                type='email'
                fullWidth
                required
                autoComplete='email'
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                label='Password'
                type='password'
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                margin='normal'
                fullWidth
                required
                {...field}
              />
            )}
          />

          <div className={s.footer}>
            <ButtonUI
              disabled={isSubmitted && (!isValid || isSubmitting)}
              variant='filled'
              level='primary'
              onClick={() => {
                navigate('/signup');
              }}
            >
              SIGN UP
            </ButtonUI>
            <ButtonUI
              variant='border'
              level='primary'
              onClick={() => {
                navigate('/signin');
              }}
            >
              SIGN IN
            </ButtonUI>
          </div>
        </Box>
      </Box>
    </Container>
  );
};
