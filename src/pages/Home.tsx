import { useGetFeaturedPlaylistsQuery } from '../features/songs/songsApiSlice';
import { PlaylistCard } from '../features/songs/PlaylistCard';

import { SkeletonPlaylistCard } from '../components/Skeleton/SkeletonPlaylistCard';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { ErrorMessage } from '../components/ErrorMessage';

interface HomeProps {
  countryName: string;
}

export function Home({ countryName }: HomeProps) {
  const {
    data: featurePlaylists,
    isLoading,
    isError,
  } = useGetFeaturedPlaylistsQuery();

  if (isLoading) {
    return (
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="mt-6">
          <Skeleton classes="title width-50" />
        </div>

        <div className="grid grid-cols-layout place-items-center gap-4 mt-12 pb-40">
          {[...Array(10).keys()].map((item) => {
            return <SkeletonPlaylistCard key={item} />;
          })}
        </div>
      </div>
    );
  }

  if (!featurePlaylists || isError) {
    return (
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <ErrorMessage />
      </div>
    );
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <h1 className="text-2xl text-slate-700 dark:text-slate-300 font-bold mt-6 animate-slideDown">
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
