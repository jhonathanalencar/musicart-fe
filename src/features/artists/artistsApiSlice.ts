import { apiSlice } from '../../app/api/apiSlice';

import {
  GetArtistAlbumsResponse,
  GetArtistResponse,
  GetArtistTopTracksResponse,
  GetRelatedArtistsResponse,
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
      { artistId: string | undefined; countryCode: string }
    >({
      query: ({ artistId, countryCode }) => ({
        url: `/artists/${artistId}/top-tracks`,
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
    getRelatedArtists: builder.query<
      GetRelatedArtistsResponse,
      string | undefined
    >({
      query: (artistId) => ({
        url: `/artists/${artistId}/related-artists`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetArtistByIdQuery,
  useGetArtistTopTracksQuery,
  useGetArtistAlbumsQuery,
  useGetRelatedArtistsQuery,
} = artistsApiSlice;
