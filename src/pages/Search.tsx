import { useParams } from 'react-router-dom';

import { useSearchForItemQuery } from '../features/songs/songsApiSlice';
import { ErrorMessage } from '../components/ErrorMessage';
import { useKeenSlider } from 'keen-slider/react';
import { SongCard } from '../features/songs/SongCard';
import { Content } from '../features/search/Content';
import { ArtistCard } from '../features/artists/ArtistCard';

export function Search() {
  const { query } = useParams();

  const { data, isLoading, isError } = useSearchForItemQuery(query);

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

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="pb-40">
          <div className="w-full flex flex-col gap-3 mt-4">
            <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Tracks
            </h2>

            <div ref={sliderRef} className="keen-slider">
              {data.tracks.items.map((track, index) => {
                return (
                  <div key={track.id} className="keen-slider__slide">
                    <SongCard
                      track={track}
                      songIndex={index}
                      className="h-full"
                      animate={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Content
            title="Artists"
            content={
              <div ref={sliderRef} className="keen-slider">
                {data.artists.items.map((artist) => {
                  if (!artist.images[0]?.url.length) return null;

                  return (
                    <div key={artist.id} className="keen-slider__slide">
                      <ArtistCard
                        artistId={artist.id}
                        imageUrl={artist.images[0]?.url}
                        name={artist.name}
                      />
                    </div>
                  );
                })}
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
