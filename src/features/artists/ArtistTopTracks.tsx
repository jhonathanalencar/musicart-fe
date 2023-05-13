import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSlidesPerView } from '../../hooks/useSlidesPerView';
import { useUserLocation } from '../../hooks/useUserLocation';

import { Skeleton } from '../../components/Skeleton/Skeleton';
import { SkeletonSongCard } from '../../components/Skeleton/SkeletonSongCard';
import { Slider } from '../../components/Slider';
import { useGetArtistTopTracksQuery } from './artistsApiSlice';
import { setCurrentSongs } from '../player/playerSlice';

interface ArtistTopTracksProps {
  artistId: string | undefined;
}

export function ArtistTopTracks({ artistId }: ArtistTopTracksProps) {
  const { countryCode } = useUserLocation();
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useGetArtistTopTracksQuery({
    artistId,
    countryCode,
  });

  const { slidesPerView } = useSlidesPerView();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setCurrentSongs(
          data.tracks
            .map((track) => track)
            .filter((track) => track.preview_url?.length)
        )
      );
    }
  }, [data, dispatch, isSuccess]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 mt-4">
        <Skeleton classes="title width-50" />

        <div className="w-full flex gap-2 justify-between">
          {[...Array(slidesPerView).keys()].map((item) => {
            return <SkeletonSongCard key={item} />;
          })}
        </div>
      </div>
    );
  }

  if (!data || isError) return null;

  const isEmpty = data.tracks.filter((track) => track.preview_url).length === 0;

  if (isEmpty) return null;

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Top Tracks
      </h2>

      <Slider sliderItems={data} />
    </div>
  );
}
