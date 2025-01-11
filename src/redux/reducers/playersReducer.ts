/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "@/types";
import { playersInfo } from "@/lib/playersInfoStoraged";

type Props = {
  value: Player[];
};

const initialState: Props = {
  value: playersInfo,
};

const playersReducer = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (
      state,
      action: PayloadAction<{
        name: string;
        side: string;
        role: string;
      }>
    ) => {
      state.value.push({
        name: action.payload.name,
        side: action.payload.side,
        role: action.payload.role,
      });
    },

    removePlayer: (
      state,
      action: PayloadAction<{
        name: string;
      }>
    ) => {
      state.value = state.value.filter((player) => {
        return player.name !== action.payload.name;
      });
    },

    clearList: (state) => {
      state.value = [];
    },

    indicateRole: (
      state,
      action: PayloadAction<{
        role: string;
        index: number;
      }>
    ) => {
      state.value = state.value.map((player) =>
        state.value.indexOf(player) === action.payload.index
          ? {
              ...player,
              role: action.payload.role,
            }
          : player
      );
    },

    indicateSide: (
      state,
      action: PayloadAction<{
        side: string;
        index: number;
      }>
    ) => {
      state.value = state.value.map((player) =>
        state.value.indexOf(player) === action.payload.index
          ? {
              ...player,
              side: action.payload.side,
            }
          : player
      );
    },
  },
});

export const {
  addPlayer,
  clearList,
  indicateRole,
  indicateSide,
  removePlayer,
} = playersReducer.actions;

export default playersReducer.reducer;
