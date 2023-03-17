import { useEffect, useState } from 'react';
import axios from 'axios';

import { useGetChartsQuery } from '../features/songs/songsApiSlice';

export function Home() {
  const [countryCode, setCountryCode] = useState('JP');

  useEffect(() => {
    async function getUserLocation() {
      const result = await axios.get('https://ipapi.co/json');

      setCountryCode(result.data.country_code as string);
    }

    getUserLocation();
  }, []);

  const { data } = useGetChartsQuery(countryCode);

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
