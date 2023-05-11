import { apiSlice } from '../../app/api/apiSlice';
import {
  GetCategoriesResponse,
  GetPlaylistTracksResponse,
  GetFeaturedPlaylistsResponse,
  GetPlaylistsByCategoryResponse,
  GetAlbumTracksResponse,
  GetAlbumResponse,
  GetSearchForItemResponse,
} from './types';

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedPlaylists: builder.query<GetFeaturedPlaylistsResponse, string>({
      query: (countryCode: string) => ({
        url: '/browse/featured-playlists',
        method: 'GET',
        params: { country: countryCode },
      }),
    }),
    getPlaylistTracks: builder.query<
      GetPlaylistTracksResponse,
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
    getCategories: builder.query<GetCategoriesResponse, { offset: number }>({
      query: ({ offset }) => ({
        url: '/browse/categories',
        method: 'GET',
        params: { limit: 20, offset },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.categories.items.push(...newItems.categories.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    getPlaylistsByCategory: builder.query<
      GetPlaylistsByCategoryResponse,
      string
    >({
      query: (categoryId: string) => ({
        url: `/browse/categories/${categoryId}/playlists`,
        method: 'GET',
      }),
    }),
    getAlbumsTracks: builder.query<GetAlbumTracksResponse, string | undefined>({
      query: (albumId: string) => ({
        url: `/albums/${albumId}/tracks`,
        method: 'GET',
      }),
    }),
    getAlbum: builder.query<GetAlbumResponse, string | undefined>({
      query: (albumId: string) => ({
        url: `/albums/${albumId}`,
        method: 'GET',
      }),
    }),
    searchForItem: builder.query<GetSearchForItemResponse, string | undefined>({
      query: (query: string) => ({
        url: '/search',
        method: 'GET',
        params: {
          q: query,
          type: ['track', 'artist', 'playlist', 'album'],
        },
      }),
    }),
  }),
});

export const {
  useGetFeaturedPlaylistsQuery,
  useGetPlaylistTracksQuery,
  useGetCategoriesQuery,
  useGetPlaylistsByCategoryQuery,
  useGetAlbumsTracksQuery,
  useGetAlbumQuery,
  useSearchForItemQuery,
} = songsApiSlice;
