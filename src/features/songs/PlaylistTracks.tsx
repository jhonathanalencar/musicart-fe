import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { setCurrentSongs } from '../player/playerSlice';
import { useGetPlaylistTracksQuery } from './songsApiSlice';

import { PlaylistHeader } from './PlaylistHeader';
import { SongCard } from './SongCard';
import { SkeletonSongCard } from '../../components/Skeleton/SkeletonSongCard';
import { Skeleton } from '../../components/Skeleton/Skeleton';

export function PlaylistTracks() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useGetPlaylistTracksQuery(id);

  const currentSongs = useAppSelector((state) => state.player.currentSongs);

  useEffect(() => {
    if (isSuccess) {
      const tracks = data.tracks.items.map((track) => track.track);

      dispatch(
        setCurrentSongs(tracks.filter((track) => track.preview_url?.length))
      );
    }
  }, [data, dispatch, isSuccess]);

  if (isLoading) {
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

  if (!data || isError) {
    return <p>error</p>;
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <PlaylistHeader
          coverartUrl={data.images[0].url}
          name={data.name}
          description={data.description}
          songsAmount={data.tracks.total}
        />

        <div className="grid grid-cols-layout gap-4 mt-12 pb-40">
          {currentSongs.map((track, index) => {
            if (!track.preview_url) return null;

            return <SongCard key={track.id} track={track} songIndex={index} />;
          })}
        </div>
      </div>
    </section>
  );
}
