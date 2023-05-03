import { Albums, Artist, Track } from '../songs/types';

export type GetArtistResponse = Artist;

export type GetArtistTopTracksResponse = {
  tracks: Track[];
};

export type GetArtistAlbumsResponse = Albums;
