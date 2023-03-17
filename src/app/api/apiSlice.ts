import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SHAZAM_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_X_RAPID_API_KEY);
      headers.set('X-RapidAPI-Host', import.meta.env.VITE_X_RAPID_API_HOST);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
