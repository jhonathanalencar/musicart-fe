import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/classNames';
import { TrackType } from '../../features/songs/types';

import { VolumeBar } from './VolumeBar';
import { SeekBar } from './SeekBar';
import { Controls } from './Controls';
import { Card } from './Card';

interface AudioPlayerProps {
  song: TrackType;
}

export function AudioPlayer({ song }: AudioPlayerProps) {
  const {
    audioRef,
    isPlaying,
    isMuted,
    isLoop,
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
    toggleLoop,
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
        {isAboveMediumScreens ? (
          <Card
            coverart={song.album.images[0].url}
            title={song.name}
            subtitle={song.album.artists[0].name}
          />
        ) : null}

        <div className="flex-1 justify-center flex flex-col gap-3">
          {!isAboveMediumScreens ? (
            <div className="flex justify-between">
              <Card
                coverart={song.album.images[0].url}
                title={song.name}
                subtitle={song.album.artists[0].name}
              />

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
            isLoop={isLoop}
            togglePlaying={togglePlaying}
            toggleLoop={toggleLoop}
            onFastForward={onFastForward}
            onRewind={onRewind}
            setIsPlaying={setIsPlaying}
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
          src={song.preview_url}
        >
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
}
