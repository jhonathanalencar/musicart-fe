import { PlaylistGenre } from '../features/songs/PlaylistGenre';
import { useGetCategoriesQuery } from '../features/songs/songsApiSlice';

import { SkeletonPlaylistCard } from '../components/Skeleton/SkeletonPlaylistCard';
import { ErrorMessage } from '../components/ErrorMessage';

export function Explore() {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
          <div className="mt-6 flex flex-wrap justify-center">
            {[...Array(10).keys()].map((item) => {
              return <SkeletonPlaylistCard key={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!data || isError) {
    return <ErrorMessage />;
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="pb-40">
          {data.categories.items.map((genre, index) => {
            return (
              <PlaylistGenre
                key={`${index}-${genre}`}
                genreId={genre.id}
                genreName={genre.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
