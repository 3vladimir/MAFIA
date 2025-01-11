import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "@/redux/reducers/playersReducer";

export const store = configureStore({
  reducer: {
    players: playersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
