import { apiSlice } from '../../app/api/apiSlice';

import { GetArtistResponse } from './types';

const artistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtistById: builder.query<GetArtistResponse, string | undefined>({
      query: (artistId: string) => ({
        url: `/artists/${artistId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetArtistByIdQuery } = artistsApiSlice;
