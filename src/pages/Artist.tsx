import { useParams } from 'react-router-dom';

import { useGetArtistByIdQuery } from '../features/artists/artistsApiSlice';

import { ErrorMessage } from '../components/ErrorMessage';
import { ArtistHeader } from '../features/artists/ArtistHeader';
import { RelatedArtists } from '../features/artists/RelatedArtists';
import { ArtistTopTracks } from '../features/artists/ArtistTopTracks';
import { ArtistAlbums } from '../features/artists/ArtistAlbums';

export function Artist() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetArtistByIdQuery(id);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data || isError) {
    return <ErrorMessage />;
  }

  console.log(data);

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="mt-6 pb-40">
          <div className="w-full h-full">
            <ArtistHeader name={data.name} imageUrl={data.images[0].url} />

            <ArtistTopTracks artistId={id} />

            <ArtistAlbums artistId={id} />

            <RelatedArtists artistId={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
