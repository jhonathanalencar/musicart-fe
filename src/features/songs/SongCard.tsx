import { KeyboardEvent } from 'react';
import { Pause, Play } from 'phosphor-react';
import { useDispatch } from 'react-redux';

// import { Track } from './types';
import { cn } from '../../utils/classNames';
import { play, Song } from '../player/playerSlice';
import { useAppSelector } from '../../app/store';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export type TrackType = {
  album: {
    album_group: string;
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    images: {
      url: string;
    }[];
  };
  id: string;
  name: string;
  preview_url: string;
};

interface SongCardProps {
  track: TrackType;
  songIndex: number;
}

export function SongCard({ track, songIndex }: SongCardProps) {
  const dispatch = useDispatch();

  const activeSongIndex = useAppSelector(
    (state) => state.player.activeSongIndex
  );
  const activeSong = useAppSelector((state) => state.player.activeSong);
  const { isPlaying, togglePlaying } = useAudioPlayer();

  if (!track) return null;
  const soundPreview = track.preview_url;

  const song: Song = {
    coverart: track.album.images[0].url,
    id: track.id,
    subtitle: track.album.artists[0].name,
    title: track.name,
    url: soundPreview || '',
  };

  function handlePlay() {
    if (activeSong.id === track.id) {
      togglePlaying();
    } else {
      dispatch(play({ song, index: songIndex }));
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      handlePlay();
    }
  }

  const isActiveSong = songIndex === activeSongIndex;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlePlay}
      onKeyDown={(event) => handleKeyDown(event)}
      className={cn(
        'group p-3 rounded flex flex-col gap-1 animate-slideDown drop-shadow-sm shadow-md cursor-pointer hover:bg-violet-500 dark:hover:bg-gray-600 focus:bg-violet-500 focus-within:bg-violet-500 dark:focus:bg-gray-600 dark:focus-within:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-gray-800',
        isActiveSong
          ? 'bg-violet-500 dark:bg-gray-600 border-2 border-violet-700 dark:border-violet-400'
          : 'bg-violet-400  dark:bg-gray-700'
      )}
    >
      <div className="w-full relative">
        <img
          src={track.album.images[0].url}
          alt={track.name}
          className="object-cover w-full rounded"
        />

        <div
          className={cn(
            'absolute rounded inset-0 flex justify-center items-center group-hover:bg-zinc-900/80 group-focus:bg-zinc-900/80 focus-within:bg-zinc-900/80 transition-colors duration-300',
            isActiveSong ? 'bg-zinc-900/80' : ''
          )}
        >
          <button
            aria-label={`Play ${track.name}`}
            onKeyDown={handleKeyDown}
            className={cn(
              'bg-slate-400 p-2 rounded-full opacity-0 focus:opacity-100 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-zinc-800',
              isActiveSong ? 'opacity-100' : ''
            )}
          >
            {isActiveSong && isPlaying ? (
              <Pause weight="fill" className="w-8 h-8 text-slate-900" />
            ) : (
              <Play weight="fill" className="w-8 h-8 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      <a
        href="/"
        className="text-lg text-slate-800 dark:text-slate-200 font-bold leading-tight focus:outline-none focus:ring-0 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-0 focus:ring-offset-violet-500 dark:focus:ring-offset-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 hover:underline"
      >
        {track.name}
      </a>

      <a
        href="/"
        className="text-slate-700 dark:text-slate-400 font-bold leading-tight focus:outline-none focus:ring-0 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-0 focus:ring-offset-violet-500 dark:focus:ring-offset-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 hover:underline"
      >
        {track.album.artists[0].name}
      </a>
    </div>
  );
}
