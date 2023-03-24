import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { setCurrentSongs } from '../player/playerSlice';
import { SongCard } from './SongCard';
import { useGetPlaylistTracksQuery } from './songsApiSlice';

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
    return <p>Loading...</p>;
  }

  if (!data || isError) {
    return <p>error</p>;
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <h1 className="text-2xl text-slate-700 dark:text-slate-300 font-bold mt-6">
          {data.name}
        </h1>

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
