import { ChangeEvent, ReactNode, useCallback, useReducer, useRef } from 'react';
import { createContext } from 'use-context-selector';

import {
  onFastForwardAction,
  onLoadedMetadataAction,
  onRewindAction,
  onScrubberChangeAction,
  onTimeUpdateAction,
  onVolumeChangeAction,
  onVolumeScrubberChangeAction,
  setIsMutedAction,
  setIsPlayingAction,
  toggleMuteAction,
  togglePlayingAction,
} from '../reducers/player/actions';
import { playerReducer } from '../reducers/player/reducer';
import { PlayerState } from '../reducers/player/types';

interface PlayerContextData {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  isMuted: boolean;
  duration: number;
  mediaTime: number;
  volume: number;
  togglePlaying: () => void;
  setIsPlaying: (state: boolean) => void;
  onLoadedMetadata: () => void;
  onTimeUpdate: () => void;
  onScrubberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRewind: () => void;
  onFastForward: () => void;
  toggleMute: () => void;
  onVolumeChange: () => void;
  onVolumeScrubberChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface PlayerContextProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

const initialState: PlayerState = {
  isPlaying: false,
  isMuted: false,
  duration: 0,
  mediaTime: 0,
  volume: 0.2,
};

// function init(initialValue: number) {}

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [playerState, dispatch] = useReducer(playerReducer, initialState);

  const { isPlaying, isMuted, mediaTime, duration, volume } = playerState;

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlaying = useCallback(() => {
    dispatch(togglePlayingAction());

    audioRef.current?.paused
      ? audioRef.current?.play()
      : audioRef.current?.pause();
  }, []);

  const setIsPlaying = useCallback((state: boolean) => {
    dispatch(setIsPlayingAction(state));
  }, []);

  const onLoadedMetadata = useCallback(() => {
    if (!audioRef.current) return;

    dispatch(onLoadedMetadataAction(audioRef.current.duration));

    audioRef.current.volume = volume;
    audioRef.current.play();
  }, [volume]);

  const onTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;

    dispatch(onTimeUpdateAction(audioRef.current.currentTime));
  }, []);

  const onScrubberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current) return;

      const newTime = Number(event.target.value);

      dispatch(onScrubberChangeAction(newTime));

      audioRef.current.currentTime = newTime;
    },
    []
  );

  const onRewind = useCallback(() => {
    if (!audioRef.current) return;

    const { currentTime } = audioRef.current;
    const newTime = Math.max(currentTime - 15, 0);

    dispatch(onRewindAction(newTime));

    audioRef.current.currentTime = newTime;
  }, []);

  const onFastForward = useCallback(() => {
    if (!audioRef.current) return;

    const { currentTime } = audioRef.current;
    const newTime = Math.min(currentTime + 15, duration);
    dispatch(onFastForwardAction(newTime));

    audioRef.current.currentTime = newTime;
  }, [duration]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    dispatch(toggleMuteAction());

    audioRef.current.muted = !isMuted;
  }, [isMuted]);

  const onVolumeChange = useCallback(() => {
    if (!audioRef.current) return;

    if (audioRef.current.muted || audioRef.current.volume === 0) {
      dispatch(setIsMutedAction(true));
    } else if (!audioRef.current.muted) {
      dispatch(setIsMutedAction(false));

      dispatch(onVolumeChangeAction(audioRef.current.volume));
    }
  }, []);

  const onVolumeScrubberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current) return;

      const newVolume = Number(event.target.value);

      dispatch(onVolumeScrubberChangeAction(newVolume));

      audioRef.current.volume = newVolume;
    },
    []
  );

  return (
    <PlayerContext.Provider
      value={{
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
