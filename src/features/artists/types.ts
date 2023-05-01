import { Artist, Track } from '../songs/types';

export type GetArtistResponse = Artist;

export type GetArtistTopTracksResponse = {
  tracks: Track[];
};
