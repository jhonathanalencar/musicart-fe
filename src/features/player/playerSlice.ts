import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Song = {
  coverart: string;
  id: string;
  subtitle: string;
  title: string;
  url: string;
};

interface PlayerState {
  currentSongs: Song[];
  activeSong: Song;
  activeSongIndex: number | null;
}

const initialState: PlayerState = {
  currentSongs: [],
  activeSong: {} as Song,
  activeSongIndex: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play(state, action: PayloadAction<{ song: Song; index: number }>) {
      state.activeSong = action.payload.song;
      state.activeSongIndex = action.payload.index;
    },
  },
});

export const { play } = playerSlice.actions;
