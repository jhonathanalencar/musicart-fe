import { useParams } from 'react-router-dom';

import { useSearchForItemQuery } from '../features/songs/songsApiSlice';
import { ErrorMessage } from '../components/ErrorMessage';
import { useKeenSlider } from 'keen-slider/react';
import { SongCard } from '../features/songs/SongCard';
import { Content } from '../features/search/Content';
import { ArtistCard } from '../features/artists/ArtistCard';
import { AlbumCard } from '../features/songs/AlbumCard';
import { PlaylistCard } from '../features/songs/PlaylistCard';

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

  return (
    <section className="h-full w-full overflow-auto hide-scrollbar">
      <div className="h-full w-full max-w-[1400px] mx-auto px-2 md:px-6">
        <div className="pb-40">
          <Content
            title="Tracks"
            content={
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
            }
          />

          <Content
            title="Artists"
            content={
              <div ref={sliderRef} className="keen-slider">
                {data.artists.items.map((artist) => {
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

          <Content
            title="Albums"
            content={
              <div ref={sliderRef} className="keen-slider">
                {data.albums.items.map((album) => {
                  return (
                    <div key={album.id} className="keen-slider__slide">
                      <AlbumCard
                        albumId={album.id}
                        coverartUrl={album.images[0]?.url}
                        name={album.name}
                      />
                    </div>
                  );
                })}
              </div>
            }
          />

          <Content
            title="Playlists"
            content={
              <div ref={sliderRef} className="keen-slider">
                {data.playlists.items.map((playlist) => {
                  return (
                    <div key={playlist.id} className="keen-slider__slide">
                      <PlaylistCard
                        playlistId={playlist.id}
                        coverartUrl={playlist.images[0]?.url}
                        name={playlist.name}
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
