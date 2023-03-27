import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { useGetArtistQuery } from '../features/songs/songsApiSlice';

export function Artist() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetArtistQuery(id);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data || isError) {
    return <ErrorMessage />;
  }

  console.log(data);

  return <section></section>;
}
