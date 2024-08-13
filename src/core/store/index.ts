import { configureStore } from "@reduxjs/toolkit";
import { default as userReducer } from "./slices/user";
import { default as noticeReducer } from "./slices/notice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notice: noticeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
