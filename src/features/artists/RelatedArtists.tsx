import { useGetRelatedArtistsQuery } from './artistsApiSlice';
import { Slider } from '../../components/Slider';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { useSlidesPerView } from '../../hooks/useSlidesPerView';
import { SkeletonArtistCard } from '../../components/Skeleton/SkeletonArtistCard';

interface RelatedArtistsProps {
  artistId: string | undefined;
}

export function RelatedArtists({ artistId }: RelatedArtistsProps) {
  const { data, isLoading, isError } = useGetRelatedArtistsQuery(artistId);

  const { slidesPerView } = useSlidesPerView();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 mt-4">
        <Skeleton classes="title width-50" />

        <div className="w-full flex gap-2 justify-between">
          {[...Array(slidesPerView).keys()].map((item) => {
            return <SkeletonArtistCard key={item} />;
          })}
        </div>
      </div>
    );
  }

  if (!data || isError) return null;

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Related Artists
      </h2>

      <Slider sliderItems={data} />
    </div>
  );
}
