import { KeyboardEvent } from 'react';
import { Play } from 'phosphor-react';
import useSound from 'use-sound';

import { Track } from './types';

interface SongCardProps {
  track: Track;
}

export function SongCard({ track }: SongCardProps) {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      console.log('works');
    }
  }

  const soundPreview = track.hub.actions?.[1].uri;
  const [play] = useSound(soundPreview ? soundPreview : '');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => play()}
      onKeyDown={(event) => handleKeyDown(event)}
      className="group p-3 rounded flex flex-col gap-1 animate-slideDown bg-violet-400 dark:bg-gray-700 drop-shadow-sm cursor-pointer hover:bg-violet-500 dark:hover:bg-gray-600 focus:bg-violet-500 focus-within:bg-violet-500 dark:focus:bg-gray-600 dark:focus-within:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-gray-800"
    >
      <div className="w-full relative">
        <img
          src={track.images.coverart}
          alt={track.title}
          className="object-cover w-full rounded"
        />

        <div className="absolute rounded inset-0 flex justify-center items-center group-hover:bg-zinc-900/80 group-focus:bg-zinc-900/80 focus-within:bg-zinc-900/80 transition-colors duration-300">
          <button
            aria-label={`Play ${track.title}`}
            className="bg-slate-400 p-2 rounded-full opacity-0 focus:opacity-100 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            <Play weight="fill" className="w-8 h-8 text-slate-900" />
          </button>
        </div>
      </div>

      <a
        href="/"
        className="text-lg text-slate-800 dark:text-slate-200 font-bold leading-tight focus:outline-none focus:ring-0 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-0 focus:ring-offset-violet-500 dark:focus:ring-offset-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 hover:underline"
      >
        {track.title}
      </a>

      <a
        href="/"
        className="text-slate-700 dark:text-slate-400 font-bold leading-tight focus:outline-none focus:ring-0 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-0 focus:ring-offset-violet-500 dark:focus:ring-offset-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 hover:underline"
      >
        {track.subtitle}
      </a>
    </div>
  );
}
