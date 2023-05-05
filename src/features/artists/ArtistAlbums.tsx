import { Slider } from '../../components/Slider';
import { useGetArtistAlbumsQuery } from './artistsApiSlice';

interface ArtistAlbumsProps {
  artistId: string | undefined;
}

export function ArtistAlbums({ artistId }: ArtistAlbumsProps) {
  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isError: isErrorAlbums,
  } = useGetArtistAlbumsQuery(artistId);

  if (!albums) return null;

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Albums
      </h2>
      <Slider sliderItems={albums} />
    </div>
  );
}
