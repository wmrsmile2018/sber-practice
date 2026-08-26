import {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonUI } from 'shared/ui';
import { SignInFormValues, useSignInMutation } from 'shared/store/api';
import { userActions } from 'shared/store/slices';
import { getMessageFromError } from 'shared/utils';

import { signInFormSchema } from './validator';
import s from './SignInForm.module.css';

type SignInFormProps = {
  onClick: VoidFunction;
};

export const SignInForm: FC<SignInFormProps> = memo(({ onClick }) => {
  const emailRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      emailRef.current?.focus();
    });
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [signInRequestFn, { isSuccess }] = useSignInMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInFormSchema),
  });

  const submitHandler: SubmitHandler<SignInFormValues> = useCallback(
    async (values) => {
      try {
        const response = await signInRequestFn(values).unwrap();

        dispatch(userActions.setUser(response.user));
        dispatch(
          userActions.setAccessToken({ accessToken: response.accessToken }),
        );
        toast.success('Вы успешно авторизованы!');
        if (location.state?.from) {
          return navigate(location.state.from);
        }

        navigate('/');
      } catch (error) {
        toast.error(
          getMessageFromError(
            error,
            'Не известная ошибка при авторизации пользователя',
          ),
        );
      }
    },
    [dispatch, location?.state?.from, navigate, signInRequestFn],
  );

  useEffect(() => {
    if (isSuccess) {
      onClick();
    }
  }, [onClick, isSuccess]);
  return (
    <Container component='main' maxWidth='xs' className={s.container}>
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
          Sign In
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          sx={{ my: 1 }}
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                inputRef={emailRef}
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
              variant='filled'
              level='primary'
              disabled={isSubmitted && (!isValid || isSubmitting)}
            >
              SIGN IN
            </ButtonUI>

            <ButtonUI
              variant='border'
              level='primary'
              onClick={() => {
                navigate('/signup');
                onClick();
              }}
            >
              SIGN UP
            </ButtonUI>
          </div>
        </Box>
      </Box>
    </Container>
  );
});
