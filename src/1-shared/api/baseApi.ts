import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/constants/apiConfig';

export const baseApiRedux = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});

export const baseApi = async ({
  endpoint,
  options = {},
}: {
  endpoint: string;
  options: RequestInit;
}) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return response.json();
  } catch (e) {
    if (e instanceof Error) {
      console.log('Fetch failed successfully captured:', e.message);
    } else {
      console.log('An unexpected error occurred:', e);
    }
    return null;
  }
};
