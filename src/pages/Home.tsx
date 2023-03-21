import { SongCard } from '../features/songs/SongCard';

import { useGetChartsQuery } from '../features/songs/songsApiSlice';
import { useUserLocation } from '../hooks/useUserLocation';

export function Home() {
  const { countryCode, countryName } = useUserLocation();

  const { data } = useGetChartsQuery(countryCode);

  if (!data) {
    return <p className="text-lg text-white font-semibold">Loading...</p>;
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-4">
        <h1 className="text-2xl text-slate-300 font-bold mt-6">
          Top Songs - {countryName}
        </h1>

        <div className="grid grid-cols-layout gap-4 mt-12 pb-40">
          {data?.tracks.map((track) => {
            return <SongCard key={track.key} track={track} />;
          })}
        </div>
      </div>
    </section>
  );
}
