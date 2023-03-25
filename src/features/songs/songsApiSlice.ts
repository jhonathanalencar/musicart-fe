import { apiSlice } from '../../app/api/apiSlice';
import {
  GetCategoriesResponse,
  getFeaturedPlaylistsResponse,
  getPlaylistsByGenreResponse,
  getPlaylistTracksResponse,
} from './types';

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedPlaylists: builder.query<getFeaturedPlaylistsResponse, string>({
      query: (countryCode: string) => ({
        url: '/browse/featured-playlists',
        method: 'GET',
        params: { country: countryCode },
      }),
    }),
    getPlaylistTracks: builder.query<
      getPlaylistTracksResponse,
      string | undefined
    >({
      query: (playlistId: string) => ({
        url: `/playlists/${playlistId}`,
        method: 'GET',
        params: {
          fields:
            'id,description,images,name,tracks(total,items(track(id,name,preview_url,artists(id,name),album(id,name,artists(id,name),images(url)))))',
        },
      }),
    }),
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: '/browse/categories',
        method: 'GET',
      }),
    }),
    getPlaylistsByGenre: builder.query<getPlaylistsByGenreResponse, string>({
      query: (categoryId: string) => ({
        url: `/browse/categories/${categoryId}/playlists`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetFeaturedPlaylistsQuery,
  useGetPlaylistTracksQuery,
  useGetCategoriesQuery,
  useGetPlaylistsByGenreQuery,
} = songsApiSlice;
