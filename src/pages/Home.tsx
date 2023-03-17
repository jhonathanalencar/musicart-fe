import { useEffect, useState } from 'react';
import axios from 'axios';

import { useGetChartsQuery } from '../features/songs/songsApiSlice';

export function Home() {
  const [countryCode, setCountryCode] = useState('JP');

  useEffect(() => {
    const controller = new AbortController();

    async function getUserLocation() {
      try {
        const response = await axios.get('https://ipapi.co/json', {
          signal: controller.signal,
        });

        setCountryCode(response.data.country_code as string);
      } catch (error) {
        console.log(error);
      }
    }

    getUserLocation();

    return () => {
      controller.abort();
    };
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
