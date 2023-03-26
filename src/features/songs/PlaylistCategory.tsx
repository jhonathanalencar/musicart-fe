import 'keen-slider/keen-slider.min.css';
import { forwardRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';

import { useGetPlaylistsByCategoryQuery } from './songsApiSlice';

import { PlaylistCard } from './PlaylistCard';
import { SkeletonPlaylistCard } from '../../components/Skeleton/SkeletonPlaylistCard';

interface PlaylistCategoryProps {
  categoryId: string;
  categoryName: string;
}

// eslint-disable-next-line react/display-name
export const PlaylistCategory = forwardRef<
  HTMLDivElement,
  PlaylistCategoryProps
>(({ categoryId, categoryName }, ref) => {
  const { data, isLoading, isError } =
    useGetPlaylistsByCategoryQuery(categoryId);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1 },
    breakpoints: {
      '(min-width: 35em)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 45em)': {
        slides: { perView: 3, spacing: 5 },
      },
      '(min-width: 50em)': {
        slides: { perView: 4, spacing: 5 },
      },
      '(min-width: 60em)': {
        slides: { perView: 5, spacing: 10 },
      },
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-wrap justify-center">
        {[...Array(5).keys()].map((item) => {
          return <SkeletonPlaylistCard key={item} />;
        })}
      </div>
    );
  }

  if (!data || isError) return null;

  const content = ref ? (
    <div className="w-full relative" ref={ref}>
      <h2 className="text-slate-200 text-lg md:text-xl font-bold mt-4 mb-2">
        {categoryName}
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {data.playlists.items.map((playlist, index) => {
          if (!playlist) return null;

          return (
            <div key={`${index}-${playlist.id}`} className="keen-slider__slide">
              <PlaylistCard
                coverartUrl={playlist.images[0].url}
                name={playlist.name}
                playlistId={playlist.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="w-full relative">
      <h2 className="text-slate-200 text-lg md:text-xl font-bold mt-4 mb-2">
        {categoryName}
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {data.playlists.items.map((playlist, index) => {
          if (!playlist) return null;

          return (
            <div key={`${index}-${playlist.id}`} className="keen-slider__slide">
              <PlaylistCard
                coverartUrl={playlist.images[0].url}
                name={playlist.name}
                playlistId={playlist.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return content;
});
