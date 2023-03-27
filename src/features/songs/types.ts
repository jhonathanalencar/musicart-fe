export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Album = {
  id: string;
  total_tracks: number;
  name: string;
  images: Image[];
  genres: string[];
};

export type Artist = {
  id: string;
  name: string;
  genres: string[];
  images: Image[];
};

export type Track = {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  preview_url: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Playlists = {
  total: number;
  items: {
    id: string;
    description: string;
    name: string;
    images: Image[];
    tracks: {
      total: number;
    };
  };
};

export interface GetFeaturedPlaylistsResponse {
  playlists: Playlists;
}

export interface GetPlaylistTracksResponse {
  id: string;
  description: string;
  name: string;
  images: Image[];
  tracks: {
    total: number;
    items: {
      track: Track;
    }[];
  };
}

export interface GetCategoriesResponse {
  categories: {
    total: number;
    items: Category[];
  };
}

export interface GetPlaylistsByCategoryResponse {
  playlists: Playlists;
}

export type GetArtistResponse = Artist;
