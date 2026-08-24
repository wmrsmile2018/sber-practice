import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

type SignUpResponse = {
  user: Pick<User, 'id' | 'email'>;
  accessToken: Token['accessToken'];
};

type SignInResponse = {
  user: Pick<User, 'id' | 'email'>;
  accessToken: Token['accessToken'];
};
export type SignUpFormValues = {
  email: string;
  password: string;
};
export type SignInFormValues = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpFormValues>({
      query: (signUpFormValues) => ({
        url: '/auth/register',
        method: 'POST',
        body: signUpFormValues,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInFormValues>({
      query: (signInFormValues) => ({
        url: '/auth/login',
        method: 'POST',
        body: signInFormValues,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
