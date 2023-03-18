import { SongCard } from '../features/songs/SongCard';

import { useGetChartsQuery } from '../features/songs/songsApiSlice';
import { useUserLocation } from '../hooks/useUserLocation';

export function Home() {
  const { countryCode } = useUserLocation();

  const { data } = useGetChartsQuery(countryCode);

  if (!data) {
    return <p className="text-lg text-white font-semibold">Loading...</p>;
  }

  return (
    <section className="h-full w-full ">
      <div className="h-full w-full max-w-[1400px] mx-auto pt-12 pb-40 px-4 grid grid-cols-layout gap-4 overflow-auto hide-scrollbar">
        {data?.tracks.map((track) => {
          return <SongCard key={track.key} track={track} />;
        })}
      </div>
    </section>
  );
}
