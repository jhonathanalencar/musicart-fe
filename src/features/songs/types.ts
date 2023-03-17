type TrackArtists = {
  adamid: string;
  alias: string;
  id: string;
};

type TrackHubActions = {
  name: string;
  type: string;
  uri?: string;
  id?: string;
};

type TrackHub = {
  actions: TrackHubActions[];
  displayname: string;
  explicit: boolean;
  image: string;
};

type TrackImages = {
  background: string;
  coverart: string;
  coverarthq: string;
};

type TrackShare = {
  avatar: string;
  href: string;
  html: string;
  image: string;
  subject: string;
  text: string;
  twitter: string;
};

export type Track = {
  artists: TrackArtists[];
  hub: TrackHub;
  images: TrackImages;
  key: string;
  share: TrackShare;
  subtitle: string;
  title: string;
  type: string;
  url: string;
};

export interface GetChartsReturn {
  tracks: Track[];
}
