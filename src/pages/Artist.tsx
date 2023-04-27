import { useParams } from 'react-router-dom';

import { useGetArtistByIdQuery } from '../features/artists/artistsApiSlice';

import { ErrorMessage } from '../components/ErrorMessage';

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
    <section className="h-full w-full">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <img src={data.images[0].url} alt={data.name} />
      </div>
    </section>
  );
}
