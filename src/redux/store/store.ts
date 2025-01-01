import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "../reducers/playersReducer";

export const store = configureStore({
  reducer: {
    players: playersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
