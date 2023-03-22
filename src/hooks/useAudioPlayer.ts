import { useContextSelector } from 'use-context-selector';
import { PlayerContext } from '../contexts/PlayerContext';

export function useAudioPlayer() {
  const audioRef = useContextSelector(
    PlayerContext,
    (context) => context.audioRef
  );

  const isPlaying = useContextSelector(
    PlayerContext,
    (context) => context.isPlaying
  );

  const isMuted = useContextSelector(
    PlayerContext,
    (context) => context.isMuted
  );

  const mediaTime = useContextSelector(
    PlayerContext,
    (context) => context.mediaTime
  );

  const duration = useContextSelector(
    PlayerContext,
    (context) => context.duration
  );

  const volume = useContextSelector(PlayerContext, (context) => context.volume);

  const togglePlaying = useContextSelector(
    PlayerContext,
    (context) => context.togglePlaying
  );

  const setIsPlaying = useContextSelector(
    PlayerContext,
    (context) => context.setIsPlaying
  );

  const onLoadedMetadata = useContextSelector(
    PlayerContext,
    (context) => context.onLoadedMetadata
  );

  const onTimeUpdate = useContextSelector(
    PlayerContext,
    (context) => context.onTimeUpdate
  );

  const onScrubberChange = useContextSelector(
    PlayerContext,
    (context) => context.onScrubberChange
  );

  const onRewind = useContextSelector(
    PlayerContext,
    (context) => context.onRewind
  );

  const onFastForward = useContextSelector(
    PlayerContext,
    (context) => context.onFastForward
  );

  const toggleMute = useContextSelector(
    PlayerContext,
    (context) => context.toggleMute
  );

  const onVolumeChange = useContextSelector(
    PlayerContext,
    (context) => context.onVolumeChange
  );

  const onVolumeScrubberChange = useContextSelector(
    PlayerContext,
    (context) => context.onVolumeScrubberChange
  );

  return {
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
  };
}
