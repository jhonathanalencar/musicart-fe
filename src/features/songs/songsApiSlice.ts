import { apiSlice } from '../../app/api/apiSlice';
import { FeaturedPlaylists, PlaylistTracks } from './types';

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedPlaylists: builder.query<FeaturedPlaylists, void>({
      query: () => ({
        url: '/browse/featured-playlists',
        method: 'GET',
      }),
    }),
    getPlaylistTracks: builder.query<PlaylistTracks, string | undefined>({
      query: (playlistId: string) => ({
        url: `/playlists/${playlistId}`,
        method: 'GET',
        params: {
          fields:
            'id,description,images,name,tracks(items(track(id,name,preview_url,artists(id,name),album(id,name,artists(id,name),images(url)))))',
        },
      }),
    }),
  }),
});

export const { useGetFeaturedPlaylistsQuery, useGetPlaylistTracksQuery } =
  songsApiSlice;
