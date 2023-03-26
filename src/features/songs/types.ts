export interface getFeaturedPlaylistsResponse {
  playlists: Playlists;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[];
}

export interface Item {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Owner {
  external_urls: ExternalUrls2;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface getPlaylistTracksResponse {
  description: string;
  id: string;
  images: Image[];
  name: string;
  tracks: Tracks;
}

export interface Tracks {
  items: Item[];
}

export interface Item {
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist2[];
  id: string;
  name: string;
  preview_url: string;
}

export interface Album {
  artists: Artist[];
  id: string;
  images: Image2[];
  name: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image2 {
  height: number;
  url: string;
  width: number;
}

export interface Artist2 {
  id: string;
  name: string;
}

export interface GetCategoriesResponse {
  categories: {
    items: {
      id: string;
      name: string;
    }[];
    total: number;
  };
}

export interface getPlaylistsByCategoryResponse {
  playlists: {
    items: {
      description: string;
      id: string;
      name: string;
      images: {
        url: string;
      }[];
    }[];
    total: number;
  };
}
