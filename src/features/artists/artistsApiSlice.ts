import { apiSlice } from '../../app/api/apiSlice';

import {
  GetArtistAlbumsResponse,
  GetArtistResponse,
  GetArtistTopTracksResponse,
} from './types';

const artistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtistById: builder.query<GetArtistResponse, string | undefined>({
      query: (artistId: string) => ({
        url: `/artists/${artistId}`,
        method: 'GET',
      }),
    }),
    getArtistTopTracks: builder.query<
      GetArtistTopTracksResponse,
      { id: string | undefined; countryCode: string }
    >({
      query: ({ id, countryCode }) => ({
        url: `/artists/${id}/top-tracks`,
        method: 'GET',
        params: { country: countryCode },
      }),
    }),
    getArtistAlbums: builder.query<GetArtistAlbumsResponse, string | undefined>(
      {
        query: (artistId: string) => ({
          url: `/artists/${artistId}/albums`,
          params: {
            include_groups: 'single,appears_on',
          },
        }),
      }
    ),
  }),
});

export const {
  useGetArtistByIdQuery,
  useGetArtistTopTracksQuery,
  useGetArtistAlbumsQuery,
} = artistsApiSlice;
