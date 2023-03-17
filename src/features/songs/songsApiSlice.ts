import { apiSlice } from '../../app/api/apiSlice';
import { GetChartsReturn } from './types';

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCharts: builder.query<GetChartsReturn, string>({
      query: (countryCode: string) => ({
        url: '/charts/track',
        method: 'GET',
        params: {
          locale: 'en-US',
          listId: `ip-country-chart-${countryCode}`,
          pageSize: 20,
          startFrom: 10,
        },
      }),
    }),
  }),
});

export const { useGetChartsQuery } = songsApiSlice;
