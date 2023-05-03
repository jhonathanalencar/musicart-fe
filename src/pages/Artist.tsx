import { useParams } from 'react-router-dom';

import {
  useGetArtistAlbumsQuery,
  useGetArtistByIdQuery,
  useGetArtistTopTracksQuery,
} from '../features/artists/artistsApiSlice';

import { ErrorMessage } from '../components/ErrorMessage';
import { useUserLocation } from '../hooks/useUserLocation';
import { useKeenSlider } from 'keen-slider/react';
import { SongCard } from '../features/songs/SongCard';
import { AlbumCard } from '../features/songs/AlbumCard';
import { ArtistHeader } from '../features/artists/ArtistHeader';

export function Artist() {
  const { id } = useParams();

  const { countryCode } = useUserLocation();

  const { data, isLoading, isError } = useGetArtistByIdQuery(id);
  const {
    data: topTracks,
    isLoading: isLoadingTopTracks,
    isError: isErrorTopTracks,
  } = useGetArtistTopTracksQuery({ id, countryCode });
  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isError: isErrorAlbums,
  } = useGetArtistAlbumsQuery(id, {
    refetchOnFocus: true,
  });

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

  if (isLoading || isLoadingTopTracks || isLoadingAlbums) {
    return <p>Loading</p>;
  }

  if (
    !data ||
    isError ||
    !topTracks ||
    isErrorTopTracks ||
    !albums ||
    isErrorAlbums
  ) {
    return <ErrorMessage />;
  }

  console.log(data);
  console.log(topTracks);
  console.log(albums);

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="mt-6 pb-40">
          <div className="w-full h-full">
            <ArtistHeader name={data.name} imageUrl={data.images[0].url} />

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

            <div className="w-full flex flex-col gap-3 mt-4">
              <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Albums
              </h2>
              <div ref={sliderRef} className="keen-slider">
                {albums.items.map((album) => {
                  return (
                    <div key={album.id} className="keen-slider__slide flex">
                      <AlbumCard
                        key={album.id}
                        name={album.name}
                        albumId={album.id}
                        coverartUrl={album.images[0].url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
