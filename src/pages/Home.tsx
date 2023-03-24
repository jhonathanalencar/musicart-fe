import { useUserLocation } from '../hooks/useUserLocation';

import { useGetFeaturedPlaylistsQuery } from '../features/songs/songsApiSlice';
import { PlaylistCard } from '../features/songs/PlaylistCard';

export function Home() {
  const { countryName } = useUserLocation();

  const {
    data: featurePlaylists,
    isLoading,
    isError,
  } = useGetFeaturedPlaylistsQuery();

  if (isLoading) {
    return <p className="text-lg text-white font-semibold">Loading...</p>;
  }

  if (!featurePlaylists || isError) {
    return <p>error</p>;
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <h1 className="text-2xl text-slate-700 dark:text-slate-300 font-bold mt-6">
          Featured Playlists - {countryName}
        </h1>

        <div className="grid grid-cols-layout gap-4 mt-12 pb-40">
          {featurePlaylists.playlists.items.map((playlist) => {
            return (
              <PlaylistCard
                key={playlist.id}
                playlistId={playlist.id}
                coverartUrl={playlist.images[0].url}
                name={playlist.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
