import { useParams } from 'react-router-dom';

import { useGetArtistByIdQuery } from '../features/artists/artistsApiSlice';

import { ErrorMessage } from '../components/ErrorMessage';
import { ArtistHeader } from '../features/artists/ArtistHeader';
import { RelatedArtists } from '../features/artists/RelatedArtists';
import { ArtistTopTracks } from '../features/artists/ArtistTopTracks';
import { ArtistAlbums } from '../features/artists/ArtistAlbums';
import { Skeleton } from '../components/Skeleton/Skeleton';

export function Artist() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetArtistByIdQuery(id);

  if (isLoading) {
    return (
      <section className="h-full w-full overflow-auto hide-scrollbar">
        <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
          <div className="mt-6 pb-40">
            <div className="w-full h-full">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b-2 border-b-gray-400 dark:border-b-gray-600">
                <div className="h-52 w-52 md:h-64 md:w-64 rounded-full aspect-square">
                  <Skeleton classes="coverart profile" />
                </div>
                <Skeleton classes="text width-50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || isError) {
    return (
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <ErrorMessage />
      </div>
    );
  }

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="mt-6 pb-40">
          <div className="w-full h-full">
            <ArtistHeader name={data.name} imageUrl={data.images[0]?.url} />

            <ArtistTopTracks artistId={id} />

            <ArtistAlbums artistId={id} />

            <RelatedArtists artistId={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
