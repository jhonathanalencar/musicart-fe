import { ChangeEvent } from 'react';

import { formatHumanReadTime, formatTime } from '../../utils/formatter';

interface SeekBarProps {
  mediaTime: number;
  duration: number;
  onScrubberChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SeekBar({
  mediaTime,
  duration,
  onScrubberChange,
}: SeekBarProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">
        Elapsed Time: {formatHumanReadTime(mediaTime)}
      </span>
      <span
        aria-hidden="true"
        className="text-slate-300 text-base font-medium font-mono"
      >
        {formatTime(mediaTime)}
      </span>

      <input
        type="range"
        id="time-scrubber"
        value={mediaTime}
        min={0}
        max={duration}
        onChange={onScrubberChange}
        aria-valuetext={formatHumanReadTime(mediaTime)}
        className="w-full accent-violet-500"
      />

      <span className="sr-only">
        Total time: {formatHumanReadTime(duration)}
      </span>
      <span
        aria-hidden="true"
        className="text-slate-300 text-base font-medium font-mono"
      >
        {formatTime(duration)}
      </span>
    </div>
  );
}
