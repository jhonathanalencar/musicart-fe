import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TrackType } from '../songs/types';

interface PlayerState {
  currentSongs: TrackType[];
  activeSong: TrackType;
  activeSongIndex: number | null;
}

const initialState: PlayerState = {
  currentSongs: [],
  activeSong: {} as TrackType,
  activeSongIndex: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSongs(state, action: PayloadAction<TrackType[]>) {
      state.currentSongs = action.payload;
    },
    selectSong(
      state,
      action: PayloadAction<{ song: TrackType; index: number }>
    ) {
      state.activeSong = action.payload.song;
      state.activeSongIndex = action.payload.index;
    },
    nextSong(state) {
      const currentIndex = state.activeSongIndex;

      if (currentIndex === null) {
        state.activeSong = state.currentSongs[0];
        state.activeSongIndex = 0;
      } else if (currentIndex >= state.currentSongs.length - 1) {
        state.activeSong = state.currentSongs[0];
        state.activeSongIndex = 0;
      } else {
        state.activeSong = state.currentSongs[currentIndex + 1];
        state.activeSongIndex = currentIndex + 1;
      }
    },
    previousSong(state) {
      const currentIndex = state.activeSongIndex;

      if (currentIndex === null) {
        state.activeSong = state.currentSongs[0];
        state.activeSongIndex = 0;
      } else if (currentIndex === 0) {
        state.activeSong = state.currentSongs[state.currentSongs.length - 1];
        state.activeSongIndex = state.currentSongs.length - 1;
      } else {
        state.activeSong = state.currentSongs[currentIndex - 1];
        state.activeSongIndex = currentIndex - 1;
      }
    },
  },
});

export const { selectSong, setCurrentSongs, nextSong, previousSong } =
  playerSlice.actions;

export const playerReducer = playerSlice.reducer;
