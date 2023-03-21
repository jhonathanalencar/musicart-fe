import { ChangeEvent } from 'react';
import { SpeakerHigh, SpeakerX } from 'phosphor-react';

interface VolumeBarProps {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  onVolumeScrubberChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function VolumeBar({
  isMuted,
  volume,
  toggleMute,
  onVolumeScrubberChange,
}: VolumeBarProps) {
  return (
    <div className="flex flex-1 justify-center gap-2">
      <button onClick={toggleMute}>
        {isMuted ? (
          <>
            <span className="sr-only">Unmute</span>
            <SpeakerX
              aria-hidden="true"
              weight="fill"
              className="h-6 w-6 text-slate-300"
            />
          </>
        ) : (
          <>
            <span className="sr-only">Mute</span>
            <SpeakerHigh
              aria-hidden="true"
              weight="fill"
              className="h-6 w-6 text-slate-300"
            />
          </>
        )}
      </button>

      <label htmlFor="volume-scrubber" className="sr-only">
        Volume
      </label>
      <input
        type="range"
        id="volume-scrubber"
        value={isMuted ? 0 : volume}
        min={0}
        max={1}
        step={0.1}
        onChange={onVolumeScrubberChange}
        className="accent-violet-500"
      />
    </div>
  );
}
