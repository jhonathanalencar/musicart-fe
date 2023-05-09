import { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { Albums, Artist, Track } from '../features/songs/types';
import { AlbumCard } from '../features/songs/AlbumCard';
import { ArtistCard } from '../features/artists/ArtistCard';
import { SongCard } from '../features/songs/SongCard';
import { useSlidesPerView } from '../hooks/useSlidesPerView';

interface SliderProps {
  sliderItems: Albums | { artists: Artist[] } | { tracks: Track[] };
}

export function Slider({ sliderItems }: SliderProps) {
  const sliderButtonStyles =
    'bg-violet-500 dark:bg-gray-900 p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:dark:bg-gray-900 hover:bg-violet-600 dark:hover:bg-gray-700 focus-visible:bg-violet-600 dark:focus-visible:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-900 dark:focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 dark:focus-visible:ring-offset-gray-800';

  const [slideIndex, setSlideIndex] = useState(0);
  const { slidesPerView } = useSlidesPerView();

  function resetSliderIndex() {
    setSlideIndex(0);
  }

  useEffect(() => {
    resetSliderIndex();
  }, [sliderItems]);

  function handleNextSlide() {
    setSlideIndex((prev) => prev + 1);
  }

  function handlePrevSlide() {
    setSlideIndex((prev) => prev - 1);
  }

  function isAlbums(
    items: Albums | { artists: Artist[] } | { tracks: Track[] }
  ): items is Albums {
    return Object.keys(items).includes('items');
  }

  function isArtist(
    items: { artists: Artist[] } | { tracks: Track[] }
  ): items is { artists: Artist[] } {
    return Object.keys(items).includes('artists');
  }

  const itemsArray = isAlbums(sliderItems)
    ? sliderItems.items
    : isArtist(sliderItems)
    ? sliderItems.artists
    : sliderItems.tracks.filter((track) => track.preview_url);

  const disableNextSlide =
    slideIndex + slidesPerView === itemsArray.length || itemsArray.length === 1;
  const disablePrevSlide = slideIndex === 0;

  const content = isAlbums(sliderItems)
    ? sliderItems.items
        .slice(slideIndex, slideIndex + slidesPerView)
        .map((album) => {
          return (
            <div key={album.id} className="flex flex-1">
              <AlbumCard
                name={album.name}
                albumId={album.id}
                coverartUrl={album.images[0].url}
              />
            </div>
          );
        })
    : isArtist(sliderItems)
    ? sliderItems.artists
        .slice(slideIndex, slideIndex + slidesPerView)
        .map((artist) => {
          return (
            <ArtistCard
              key={artist.id}
              artistId={artist.id}
              imageUrl={artist.images[0].url}
              name={artist.name}
            />
          );
        })
    : sliderItems.tracks
        .filter((track) => track.preview_url)
        .slice(slideIndex, slideIndex + slidesPerView)
        .map((track, index) => {
          return (
            <SongCard
              key={track.id}
              songIndex={index}
              track={track}
              animate={false}
            />
          );
        });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between gap-2 w-full">{content}</div>

      <div className="flex items-center justify-start gap-2">
        <button
          onClick={handlePrevSlide}
          disabled={disablePrevSlide}
          className={sliderButtonStyles}
        >
          <CaretLeft
            className="w-6 h-6 text-gray-200 dark:text-gray-400"
            weight="bold"
          />
        </button>
        <button
          onClick={handleNextSlide}
          disabled={disableNextSlide}
          className={sliderButtonStyles}
        >
          <CaretRight
            className="w-6 h-6 text-gray-200 dark:text-gray-400"
            weight="bold"
          />
        </button>
      </div>
    </div>
  );
}
