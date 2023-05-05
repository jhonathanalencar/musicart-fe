import { useSlidesPerView } from '../../hooks/useSlidesPerView';
import { useUserLocation } from '../../hooks/useUserLocation';

import { Skeleton } from '../../components/Skeleton/Skeleton';
import { SkeletonSongCard } from '../../components/Skeleton/SkeletonSongCard';
import { Slider } from '../../components/Slider';
import { useGetArtistTopTracksQuery } from './artistsApiSlice';

interface ArtistTopTracksProps {
  artistId: string | undefined;
}

export function ArtistTopTracks({ artistId }: ArtistTopTracksProps) {
  const { countryCode } = useUserLocation();

  const { data, isLoading, isError } = useGetArtistTopTracksQuery({
    artistId,
    countryCode,
  });

  const { slidesPerView } = useSlidesPerView();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 mt-4">
        <Skeleton classes="title width-50" />

        <div className="w-full flex gap-2 justify-between">
          {[...Array(slidesPerView).keys()].map((item) => {
            return <SkeletonSongCard key={item} />;
          })}
        </div>
      </div>
    );
  }

  if (!data || isError) return null;

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Top Tracks
      </h2>

      <Slider sliderItems={data} />
    </div>
  );
}
