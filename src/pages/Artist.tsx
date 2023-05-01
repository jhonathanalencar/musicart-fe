import { useParams } from 'react-router-dom';

import {
  useGetArtistByIdQuery,
  useGetArtistTopTracksQuery,
} from '../features/artists/artistsApiSlice';

import { ErrorMessage } from '../components/ErrorMessage';
import { useUserLocation } from '../hooks/useUserLocation';
import { useKeenSlider } from 'keen-slider/react';
import { SongCard } from '../features/songs/SongCard';

export function Artist() {
  const { id } = useParams();

  const { countryCode } = useUserLocation();

  const { data, isLoading, isError } = useGetArtistByIdQuery(id);
  const {
    data: topTracks,
    isLoading: isLoadingTopTracks,
    isError: isErrorTopTracks,
  } = useGetArtistTopTracksQuery({ id, countryCode });

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1 },
    breakpoints: {
      '(min-width: 35em)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 45em)': {
        slides: { perView: 3, spacing: 5 },
      },
      '(min-width: 50em)': {
        slides: { perView: 4, spacing: 5 },
      },
      '(min-width: 60em)': {
        slides: { perView: 5, spacing: 10 },
      },
    },
  });

  if (isLoading || isLoadingTopTracks) {
    return <p>Loading</p>;
  }

  if (!data || isError || !topTracks || isErrorTopTracks) {
    return <ErrorMessage />;
  }

  console.log(data);
  console.log(topTracks);

  return (
    <section className="h-full w-full">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="w-full h-full mt-6">
          <div className="flex items-center gap-6 pb-4 mb-4 border-b-2 border-b-gray-400 dark:border-b-gray-600">
            <div className="h-64 w-64 rounded-full overflow-hidden">
              <img
                src={data.images[0]?.url}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <strong className="text-3xl md:text-5xl text-gray-800 dark:text-white font-bold">
              {data.name}
            </strong>
          </div>

          <div className="w-full flex flex-col gap-3">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Top Tracks
            </h2>
            <div ref={sliderRef} className="keen-slider">
              {topTracks.tracks.map((track, index) => {
                return (
                  <div key={track.id} className="keen-slider__slide flex">
                    <SongCard songIndex={index} track={track} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
