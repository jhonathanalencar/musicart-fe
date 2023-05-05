import { useParams } from 'react-router-dom';

import {
  useGetArtistAlbumsQuery,
  useGetArtistByIdQuery,
  useGetArtistTopTracksQuery,
  useGetRelatedArtistsQuery,
} from '../features/artists/artistsApiSlice';

import { ErrorMessage } from '../components/ErrorMessage';
import { useUserLocation } from '../hooks/useUserLocation';
import { ArtistHeader } from '../features/artists/ArtistHeader';
import { RelatedArtists } from '../features/artists/RelatedArtists';
import { Slider } from '../components/Slider';

export function Artist() {
  const { id } = useParams();

  const { countryCode } = useUserLocation();

  const { data, isLoading, isError } = useGetArtistByIdQuery(id);
  const {
    data: topTracks,
    isLoading: isLoadingTopTracks,
    isError: isErrorTopTracks,
  } = useGetArtistTopTracksQuery({ id, countryCode });
  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isError: isErrorAlbums,
  } = useGetArtistAlbumsQuery(id);
  const {
    data: relatedArtists,
    isLoading: isLoadingRelatedArtists,
    isError: isErrorRelatedArtists,
  } = useGetRelatedArtistsQuery(id);

  if (
    isLoading ||
    isLoadingTopTracks ||
    isLoadingAlbums ||
    isLoadingRelatedArtists
  ) {
    return <p>Loading</p>;
  }

  if (
    !data ||
    isError ||
    !topTracks ||
    isErrorTopTracks ||
    !albums ||
    isErrorAlbums ||
    !relatedArtists ||
    isErrorRelatedArtists
  ) {
    return <ErrorMessage />;
  }

  console.log(data);
  console.log(topTracks);
  console.log(albums);
  console.log(relatedArtists);

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="mt-6 pb-40">
          <div className="w-full h-full">
            <ArtistHeader name={data.name} imageUrl={data.images[0].url} />

            <div className="w-full flex flex-col gap-3">
              <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Top Tracks
              </h2>

              <Slider sliderItems={topTracks} />
            </div>

            <div className="w-full flex flex-col gap-3 mt-4">
              <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Albums
              </h2>
              <Slider sliderItems={albums} />
            </div>

            <RelatedArtists artistId={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
