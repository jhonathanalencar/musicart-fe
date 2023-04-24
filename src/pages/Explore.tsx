import { useCallback, useRef, useState } from 'react';
import { CircleNotch } from 'phosphor-react';

import { PlaylistCategory } from '../features/songs/PlaylistCategory';
import { useGetCategoriesQuery } from '../features/songs/songsApiSlice';

import { SkeletonPlaylistCard } from '../components/Skeleton/SkeletonPlaylistCard';
import { ErrorMessage } from '../components/ErrorMessage';

export function Explore() {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError, isFetching } = useGetCategoriesQuery({
    offset,
  });

  const hasNextPage = data && offset < data.categories.total;

  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const lastPlaylistRef = useCallback(
    (playlist: HTMLDivElement) => {
      if (isLoading) return;

      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }

      intersectionObserver.current = new IntersectionObserver((playlists) => {
        if (playlists[0].isIntersecting && hasNextPage) {
          setOffset((prev) => prev + 20);
        }
      });

      if (playlist) {
        intersectionObserver.current.observe(playlist);
      }
    },
    [isLoading, hasNextPage]
  );

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

  const content = data.categories.items
    .slice(0, data.categories.total)
    .map((category, index) => {
      if (data.categories.items.length === index + 1) {
        return (
          <PlaylistCategory
            key={`${index}-${category}`}
            ref={lastPlaylistRef}
            categoryId={category.id}
            categoryName={category.name}
          />
        );
      }

      return (
        <PlaylistCategory
          key={`${index}-${category}`}
          categoryId={category.id}
          categoryName={category.name}
        />
      );
    });

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="pb-40">
          <div>{content}</div>
          <div className="mt-12 flex justify-center">
            {isFetching ? (
              <CircleNotch
                weight="bold"
                className="h-12 w-12 text-white animate-spin"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
