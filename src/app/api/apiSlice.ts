import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SPOTIFY_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      );

      return headers;
    },
  }),
  endpoints: () => ({}),
});
