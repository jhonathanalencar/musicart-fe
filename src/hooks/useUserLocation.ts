import { useEffect, useState } from 'react';
import axios from 'axios';

type UserLocation = {
  countryCode: string;
  countryName: string;
};

interface GetUserLocationResponse {
  country_code: string;
  country_name: string;
}

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    countryCode: 'JP',
    countryName: 'Japan',
  });

  useEffect(() => {
    const controller = new AbortController();

    async function getUserLocation() {
      try {
        const response = await axios.get<GetUserLocationResponse>(
          'https://ipapi.co/json',
          {
            signal: controller.signal,
          }
        );

        setUserLocation({
          countryCode: response.data.country_code,
          countryName: response.data.country_name,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getUserLocation();

    return () => {
      controller.abort();
    };
  }, []);

  return userLocation;
}
