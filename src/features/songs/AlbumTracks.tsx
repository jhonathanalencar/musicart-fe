import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetAlbumQuery, useGetAlbumsTracksQuery } from './songsApiSlice';
import { SongCard } from './SongCard';
import { PlaylistHeader } from './PlaylistHeader';
import { useAppSelector } from '../../app/store';
import { setCurrentSongs } from '../player/playerSlice';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { SkeletonSongCard } from '../../components/Skeleton/SkeletonSongCard';

export function AlbumTracks() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetAlbumQuery(id);
  const {
    data: albumTracks,
    isLoading: isLoadingAlbumTracks,
    isError: isErrorAlbumTracks,
    isSuccess,
  } = useGetAlbumsTracksQuery(id);

  const currentSongs = useAppSelector((state) => state.player.currentSongs);

  useEffect(() => {
    if (isSuccess && data) {
      const tracks = albumTracks.items
        .map((track) => track)
        .filter((track) => track.preview_url?.length);

      dispatch(
        setCurrentSongs(
          tracks.map((track) => {
            return {
              ...track,
              album: {
                genres: data.genres,
                id: data.id,
                images: data.images,
                name: data.name,
                total_tracks: data.total_tracks,
              },
            };
          })
        )
      );
    }
  }, [albumTracks, data, dispatch, isSuccess]);

  if (isLoadingAlbumTracks || isLoading) {
    return (
      <div className="h-full w-full overflow-hidden max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="flex gap-3 mt-6">
          <div className="w-56 h-56 rounded-md shrink-0">
            <Skeleton classes="coverart" />
          </div>
          <div className="flex flex-col w-full">
            <Skeleton classes="title width-100" />
            <Skeleton classes="text width-50" />
          </div>
        </div>

        <div className="grid grid-cols-layout gap-4 mt-12">
          {[...Array(10).keys()].map((item) => {
            return <SkeletonSongCard key={item} />;
          })}
        </div>
      </div>
    );
  }

  if (!data || !albumTracks || isError || isErrorAlbumTracks) {
    return (
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <ErrorMessage />
      </div>
    );
  }

  const isEmpty =
    data.tracks.items.filter((track) => track.preview_url).length === 0;

  const content = isEmpty ? (
    <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6 pt-4">
      <ErrorMessage message="No songs available" />
    </div>
  ) : (
    <div className="grid grid-cols-layout gap-4 mt-12 pb-40">
      {currentSongs.map((track, index) => {
        return (
          <SongCard
            key={track.id}
            songIndex={index}
            track={{
              id: track.id,
              artists: track.artists,
              name: track.name,
              preview_url: track.preview_url,
              album: {
                genres: data.genres,
                id: data.id,
                images: data.images,
                name: data.name,
                total_tracks: data.total_tracks,
              },
            }}
          />
        );
      })}
    </div>
  );

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <PlaylistHeader
          coverartUrl={data.images[0].url}
          description={data.label}
          name={data.name}
          songsAmount={data.total_tracks}
        />

        {content}
      </div>
    </section>
  );
}
