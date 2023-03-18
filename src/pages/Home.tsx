import { useGetChartsQuery } from '../features/songs/songsApiSlice';
import { useUserLocation } from '../hooks/useUserLocation';

export function Home() {
  const { countryCode } = useUserLocation();

  const { data } = useGetChartsQuery(countryCode);

  console.log('render');
  return (
    <section>
      {data?.tracks.map((track) => {
        return (
          <p className="text-white" key={track.key}>
            {track.title}
          </p>
        );
      })}
    </section>
  );
}
