import { useEffect, useState } from 'react';
import axios from 'axios';

export function useUserLocation() {
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

  return {
    countryCode,
  };
}
