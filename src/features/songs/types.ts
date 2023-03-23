export type TrackType = {
  album: {
    artists: {
      external_urls: {
        spotify: string;
      };
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    images: {
      url: string;
    }[];
  };
  id: string;
  name: string;
  preview_url: string;
};
