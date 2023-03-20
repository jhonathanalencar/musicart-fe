import { ChangeEvent, useReducer, useRef } from 'react';
import { produce } from 'immer';

interface State {
  isPlaying: boolean;
  isMuted: boolean;
  duration: number;
  mediaTime: number;
  volume: number;
}

const enum ActionTypes {
  TOGGLE_PLAYING = 'TOGGLE_PLAYING',
  PLAYING_CHANGE = 'PLAYING_CHANGE',
  DURATION_CHANGE = 'DURATION_CHANGE',
  MEDIA_TIME_CHANGE = 'MEDIA_TIME_CHANGE',
  TOGGLE_MUTE = 'TOGGLE_MUTE',
  MUTE_CHANGE = 'MUTE_CHANGE',
  VOLUME_CHANGE = 'VOLUME_CHANGE',
}

type Action =
  | { type: ActionTypes.TOGGLE_PLAYING }
  | { type: ActionTypes.PLAYING_CHANGE; payload: boolean }
  | { type: ActionTypes.DURATION_CHANGE; payload: number }
  | { type: ActionTypes.MEDIA_TIME_CHANGE; payload: number }
  | { type: ActionTypes.TOGGLE_MUTE }
  | { type: ActionTypes.MUTE_CHANGE; payload: boolean }
  | { type: ActionTypes.VOLUME_CHANGE; payload: number };

const initialState: State = {
  isPlaying: false,
  isMuted: false,
  duration: 0,
  mediaTime: 0,
  volume: 0.2,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_PLAYING: {
      return produce(state, (draft) => {
        draft.isPlaying = !state.isPlaying;
      });
    }
    case ActionTypes.PLAYING_CHANGE: {
      return produce(state, (draft) => {
        draft.isPlaying = action.payload;
      });
    }
    case ActionTypes.DURATION_CHANGE: {
      return produce(state, (draft) => {
        draft.duration = action.payload;
      });
    }
    case ActionTypes.MEDIA_TIME_CHANGE: {
      return produce(state, (draft) => {
        draft.mediaTime = action.payload;
      });
    }
    case ActionTypes.TOGGLE_MUTE: {
      return produce(state, (draft) => {
        draft.isMuted = !state.isMuted;
      });
    }
    case ActionTypes.MUTE_CHANGE: {
      return produce(state, (draft) => {
        draft.isMuted = action.payload;
      });
    }
    case ActionTypes.VOLUME_CHANGE: {
      return produce(state, (draft) => {
        draft.volume = action.payload;
      });
    }
  }
}

export function useAudioPlayer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { isPlaying, isMuted, duration, mediaTime, volume } = state;

  function togglePlaying() {
    dispatch({ type: ActionTypes.TOGGLE_PLAYING });
    audioRef.current?.paused
      ? audioRef.current?.play()
      : audioRef.current?.pause();
  }

  function setIsPlaying(state: boolean) {
    dispatch({ type: ActionTypes.PLAYING_CHANGE, payload: state });
  }

  function onLoadedMetadata() {
    if (!audioRef.current) return;

    dispatch({
      type: ActionTypes.DURATION_CHANGE,
      payload: audioRef.current.duration,
    });
    audioRef.current.volume = state.volume;
  }

  function onTimeUpdate() {
    if (!audioRef.current) return;

    dispatch({
      type: ActionTypes.MEDIA_TIME_CHANGE,
      payload: audioRef.current.currentTime,
    });
  }

  function onScrubberChange(event: ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;

    const newTime = Number(event.target.value);

    dispatch({ type: ActionTypes.MEDIA_TIME_CHANGE, payload: newTime });
    audioRef.current.currentTime = newTime;
  }

  function onRewind() {
    if (!audioRef.current) return;

    const { currentTime } = audioRef.current;
    const newTime = Math.max(currentTime - 15, 0);

    dispatch({ type: ActionTypes.MEDIA_TIME_CHANGE, payload: newTime });
    audioRef.current.currentTime = newTime;
  }

  function onFastForward() {
    if (!audioRef.current) return;

    const { currentTime } = audioRef.current;
    const newTime = Math.min(currentTime + 15, duration);

    dispatch({ type: ActionTypes.MEDIA_TIME_CHANGE, payload: newTime });
    audioRef.current.currentTime = newTime;
  }

  function toggleMute() {
    if (!audioRef.current) return;

    dispatch({ type: ActionTypes.TOGGLE_MUTE });
    audioRef.current.muted = !isMuted;
  }

  function onVolumeChange() {
    if (!audioRef.current) return;

    if (audioRef.current.muted || audioRef.current.volume === 0) {
      dispatch({ type: ActionTypes.MUTE_CHANGE, payload: true });
    } else if (!audioRef.current.muted) {
      dispatch({ type: ActionTypes.MUTE_CHANGE, payload: false });
      dispatch({
        type: ActionTypes.VOLUME_CHANGE,
        payload: audioRef.current.volume,
      });
    }
  }

  function onVolumeScrubberChange(event: ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;

    const newVolume = Number(event.target.value);

    dispatch({ type: ActionTypes.VOLUME_CHANGE, payload: newVolume });
    audioRef.current.volume = newVolume;
  }

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
