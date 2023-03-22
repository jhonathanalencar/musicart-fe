import { produce } from 'immer';

import { Action, ActionTypes, PlayerState } from './types';

export function playerReducer(state: PlayerState, action: Action) {
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
    default:
      return state;
  }
}
