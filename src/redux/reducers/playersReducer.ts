/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../types";

type Props = {
  value: Player[];
};

// const playersStoredInfo = localStorage.getItem("playersInfo");
// const playersInfo = playersStoredInfo ? JSON.parse(playersStoredInfo) : [];

const initialState: Props = {
  // value: playersInfo,
  value : []
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
        status: string;
      }>
    ) => {
      state.value.push({
        name: action.payload.name,
        side: action.payload.side,
        role: action.payload.role,
        status: action.payload.status,
      });
    },

    clearList: (state) => {
      state.value = [];
    },
  },
});
export const { addPlayer, clearList } = playersReducer.actions;

export default playersReducer.reducer;
