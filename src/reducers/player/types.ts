export interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  duration: number;
  mediaTime: number;
  volume: number;
}

export enum ActionTypes {
  TOGGLE_PLAYING = 'TOGGLE_PLAYING',
  PLAYING_CHANGE = 'PLAYING_CHANGE',
  DURATION_CHANGE = 'DURATION_CHANGE',
  MEDIA_TIME_CHANGE = 'MEDIA_TIME_CHANGE',
  TOGGLE_MUTE = 'TOGGLE_MUTE',
  MUTE_CHANGE = 'MUTE_CHANGE',
  VOLUME_CHANGE = 'VOLUME_CHANGE',
}

interface TogglePlayingAction {
  type: ActionTypes.TOGGLE_PLAYING;
}

interface SetIsPlayingAction {
  type: ActionTypes.PLAYING_CHANGE;
  payload: boolean;
}

interface OnLoadedMetadataAction {
  type: ActionTypes.DURATION_CHANGE;
  payload: number;
}

interface OnTimeUpdateAction {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
}

interface OnScrubberChangeAction {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
}

interface OnRewindAction {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
}

interface onFastForwardAction {
  type: ActionTypes.MEDIA_TIME_CHANGE;
  payload: number;
}

interface ToggleMuteAction {
  type: ActionTypes.TOGGLE_MUTE;
}

interface SetIsMutedAction {
  type: ActionTypes.MUTE_CHANGE;
  payload: boolean;
}

interface OnVolumeChangeAction {
  type: ActionTypes.VOLUME_CHANGE;
  payload: number;
}

interface OnVolumeScrubberChangeAction {
  type: ActionTypes.VOLUME_CHANGE;
  payload: number;
}

export type Action =
  | TogglePlayingAction
  | SetIsPlayingAction
  | OnLoadedMetadataAction
  | OnTimeUpdateAction
  | OnScrubberChangeAction
  | OnRewindAction
  | onFastForwardAction
  | ToggleMuteAction
  | SetIsMutedAction
  | OnVolumeChangeAction
  | OnVolumeScrubberChangeAction;
