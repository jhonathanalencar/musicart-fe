import { useParams } from 'react-router-dom';

import { useSearchForItemQuery } from '../features/songs/songsApiSlice';
import { ErrorMessage } from '../components/ErrorMessage';

export function Search() {
  const { query } = useParams();

  const { data, isLoading, isError } = useSearchForItemQuery(query);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || isError) {
    return (
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <ErrorMessage />
      </div>
    );
  }

  console.log(data);

  return <div>mikasa</div>;
}
