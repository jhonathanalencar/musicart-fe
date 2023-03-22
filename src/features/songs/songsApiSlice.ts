import { apiSlice } from '../../app/api/apiSlice';
import { GetChartsReturn } from './types';

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCharts: builder.query<GetChartsReturn, void>({
      query: () => ({
        url: '/playlist_tracks',
        method: 'GET',
        params: { id: '37i9dQZF1DX4Wsb4d7NKfP', offset: '0', limit: '100' },
      }),
    }),
  }),
});

export const { useGetChartsQuery } = songsApiSlice;
