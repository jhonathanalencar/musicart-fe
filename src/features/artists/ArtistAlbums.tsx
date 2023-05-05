import { useSlidesPerView } from '../../hooks/useSlidesPerView';
import { useGetArtistAlbumsQuery } from './artistsApiSlice';

import { Skeleton } from '../../components/Skeleton/Skeleton';
import { SkeletonPlaylistCard } from '../../components/Skeleton/SkeletonPlaylistCard';
import { Slider } from '../../components/Slider';

interface ArtistAlbumsProps {
  artistId: string | undefined;
}

export function ArtistAlbums({ artistId }: ArtistAlbumsProps) {
  const { data, isLoading, isError } = useGetArtistAlbumsQuery(artistId);

  const { slidesPerView } = useSlidesPerView();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 mt-4">
        <Skeleton classes="title width-50" />

        <div className="w-full flex gap-2">
          {[...Array(slidesPerView).keys()].map((item) => {
            return <SkeletonPlaylistCard key={item} />;
          })}
        </div>
      </div>
    );
  }

  if (!data || isError) return null;

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Albums
      </h2>
      <Slider sliderItems={data} />
    </div>
  );
}
