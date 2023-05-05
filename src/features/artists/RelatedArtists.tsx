import { useGetRelatedArtistsQuery } from './artistsApiSlice';
import { Slider } from '../../components/Slider';

interface RelatedArtistsProps {
  artistId: string | undefined;
}

export function RelatedArtists({ artistId }: RelatedArtistsProps) {
  const {
    data: relatedArtists,
    isLoading: isLoadingRelatedArtists,
    isError: isErrorRelatedArtists,
  } = useGetRelatedArtistsQuery(artistId);

  if (!relatedArtists) return null;

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Related Artists
      </h2>

      <Slider sliderItems={relatedArtists} />
    </div>
  );
}
