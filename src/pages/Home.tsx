import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../app/store';
import { data } from '../data';
import { setCurrentSongs } from '../features/player/playerSlice';
import { useUserLocation } from '../hooks/useUserLocation';

import { SongCard } from '../features/songs/SongCard';

export function Home() {
  const { countryName } = useUserLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const tracks = data.items.map(({ track }) => {
      const { artists, images } = track.album;

      return {
        album: {
          artists,
          images,
        },
        id: track.id,
        name: track.name,
        preview_url: track.preview_url || '',
      };
    });

    dispatch(setCurrentSongs(tracks.filter((track) => track.preview_url)));
  }, [dispatch]);

  const currentSongs = useAppSelector((state) => state.player.currentSongs);

  if (!currentSongs) {
    return <p className="text-lg text-white font-semibold">Loading...</p>;
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-4">
        <h1 className="text-2xl text-slate-300 font-bold mt-6">
          Top Songs - {countryName}
        </h1>

        <div className="grid grid-cols-layout gap-4 mt-12 pb-40">
          {currentSongs.map((song, index) => {
            if (!song.preview_url.length) return null;

            return (
              <SongCard
                key={`${song.id}-${index}`}
                track={song}
                songIndex={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
