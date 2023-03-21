import { FastForward, Pause, Play, Rewind } from 'phosphor-react';

interface ControlsProps {
  isPlaying: boolean;
  onRewind: () => void;
  togglePlaying: () => void;
  onFastForward: () => void;
}

export function Controls({
  isPlaying,
  onRewind,
  togglePlaying,
  onFastForward,
}: ControlsProps) {
  return (
    <div className="flex justify-center gap-3">
      <button
        aria-label="Rewind 15 seconds"
        onClick={onRewind}
        className="flex items-center gap-1"
      >
        <span className="text-slate-300 font-semibold text-lg">15</span>
        <Rewind
          weight="fill"
          className="w-6 h-6 md:w-8 md:h-8 text-slate-100"
        />
      </button>
      <button onClick={togglePlaying} className="bg-slate-100 rounded-full p-1">
        {isPlaying ? (
          <>
            <Pause
              weight="fill"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-900"
            />
            <span className="sr-only">Pause</span>
          </>
        ) : (
          <>
            <Play
              weight="fill"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-900"
            />
            <span className="sr-only">Play</span>
          </>
        )}
      </button>
      <button
        aria-label="Fast-Forward 15 seconds"
        onClick={onFastForward}
        className="flex items-center gap-1"
      >
        <FastForward
          weight="fill"
          className="w-6 h-6 md:w-8 md:h-8 text-slate-100"
        />
        <span className="text-slate-300 font-semibold text-lg">15</span>
      </button>
    </div>
  );
}
