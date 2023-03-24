import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';

import { setApiToken } from '../../features/auth/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SPOTIFY_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.apiToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const apiBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
});

interface AuthorizeResponse {
  access_token: string;
}

async function baseQueryWithReauthorization(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const authorizeResult = await apiBaseQuery(
      '/auth/authorize',
      api,
      extraOptions
    );

    if (authorizeResult.data) {
      api.dispatch(setApiToken(authorizeResult.data as AuthorizeResponse));

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauthorization,
  endpoints: () => ({}),
});
