import { KeyboardEvent } from 'react';

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

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => console.log('a')}
      onKeyDown={(event) => handleKeyDown(event)}
      className="p-3 rounded flex flex-col gap-1 bg-violet-400 dark:bg-zinc-800 drop-shadow-sm cursor-pointer hover:bg-violet-500 dark:hover:bg-zinc-700 focus:bg-violet-500 dark:focus:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:ring-offset-2 focus:ring-offset-slate-300"
    >
      <img
        src={track.images.coverart}
        alt={track.title}
        className="object-cover w-full rounded"
      />

      <strong className="text-lg text-slate-800 dark:text-slate-200 font-bold">
        {track.title}
      </strong>

      <span className="text-slate-700 dark:text-slate-400 font-bold">
        {track.subtitle}
      </span>
    </div>
  );
}
