import { ActionTypes } from './types';

export function togglePlayingAction(): {
  type: ActionTypes.TOGGLE_PLAYING;
} {
  return {
    type: ActionTypes.TOGGLE_PLAYING,
  };
}

export function setIsPlayingAction(state: boolean): {
  type: ActionTypes.PLAYING_CHANGE;
  payload: boolean;
} {
  return {
    type: ActionTypes.PLAYING_CHANGE,
    payload: state,
  };
}

export function onLoadedMetadataAction(durationInSeconds: number): {
  type: ActionTypes.DURATION_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.DURATION_CHANGE,
    payload: durationInSeconds,
  };
}

export function onTimeUpdateAction(timeInSeconds: number): {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.MEDIA_TIME_CHANGE,
    payload: timeInSeconds,
  };
}

export function onScrubberChangeAction(timeInSeconds: number): {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.MEDIA_TIME_CHANGE,
    payload: timeInSeconds,
  };
}
export function onRewindAction(timeInSeconds: number): {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.MEDIA_TIME_CHANGE,
    payload: timeInSeconds,
  };
}

export function onFastForwardAction(timeInSeconds: number): {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.MEDIA_TIME_CHANGE,
    payload: timeInSeconds,
  };
}

export function toggleMuteAction(): {
  type: ActionTypes.TOGGLE_MUTE;
} {
  return {
    type: ActionTypes.TOGGLE_MUTE,
  };
}

export function setIsMutedAction(state: boolean): {
  type: ActionTypes.MUTE_CHANGE;
  payload: boolean;
} {
  return {
    type: ActionTypes.MUTE_CHANGE,
    payload: state,
  };
}

export function onVolumeChangeAction(volume: number): {
  type: ActionTypes.VOLUME_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.VOLUME_CHANGE,
    payload: volume,
  };
}

export function onVolumeScrubberChangeAction(volume: number): {
  type: ActionTypes.VOLUME_CHANGE;
  payload: number;
} {
  return {
    type: ActionTypes.VOLUME_CHANGE,
    payload: volume,
  };
}

export function toggleLoopAction(): {
  type: ActionTypes.TOGGLE_LOOP;
} {
  return {
    type: ActionTypes.TOGGLE_LOOP,
  };
}
