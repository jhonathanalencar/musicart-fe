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
        <header className="mt-6 flex gap-3">
          <div className="w-56 h-56 rounded-md overflow-hidden shrink-0">
            <img
              src={data.images[0].url}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-slate-700 dark:text-slate-300 font-bold">
              {data.name}
            </h1>
            <p className="text-lg text-slate-400">{data.description}</p>
          </div>
        </header>

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
