import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/classNames';

import { VolumeBar } from './VolumeBar';
import { SeekBar } from './SeekBar';
import { Controls } from './Controls';
import { Card } from './Card';

// const url =
//   'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/4f/d1/6e/4fd16e9e-aee3-f565-f7ac-d374959bed75/mzaf_13334718501163194135.plus.aac.ep.m4a';

interface AudioPlayerProps {
  url: string;
}

export function AudioPlayer({ url }: AudioPlayerProps) {
  const {
    audioRef,
    isPlaying,
    isMuted,
    mediaTime,
    duration,
    volume,
    togglePlaying,
    setIsPlaying,
    onLoadedMetadata,
    onTimeUpdate,
    onScrubberChange,
    onRewind,
    onFastForward,
    toggleMute,
    onVolumeChange,
    onVolumeScrubberChange,
  } = useAudioPlayer();

  const isAboveMediumScreens = useMediaQuery('(min-width: 50em)');

  return (
    <div
      className={cn(
        'absolute z-[8] bottom-0 left-0 w-full bg-gray-900/60 backdrop-blur-sm',
        isAboveMediumScreens ? 'h-32' : 'h-44'
      )}
    >
      <div className="h-full flex items-center justify-between p-3">
        {isAboveMediumScreens ? <Card /> : null}

        <div className="flex-1 justify-center flex flex-col gap-3">
          {!isAboveMediumScreens ? (
            <div className="flex justify-between">
              <Card />

              <div className="flex">
                <VolumeBar
                  isMuted={isMuted}
                  volume={volume}
                  toggleMute={toggleMute}
                  onVolumeScrubberChange={onVolumeScrubberChange}
                />
              </div>
            </div>
          ) : null}

          <Controls
            isPlaying={isPlaying}
            togglePlaying={togglePlaying}
            onFastForward={onFastForward}
            onRewind={onRewind}
          />

          <SeekBar
            mediaTime={mediaTime}
            duration={duration}
            onScrubberChange={onScrubberChange}
          />
        </div>

        {isAboveMediumScreens ? (
          <VolumeBar
            isMuted={isMuted}
            volume={volume}
            toggleMute={toggleMute}
            onVolumeScrubberChange={onVolumeScrubberChange}
          />
        ) : null}

        <audio
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onVolumeChange={onVolumeChange}
          src={url}
        >
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
}
