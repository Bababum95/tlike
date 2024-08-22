import { configureStore } from "@reduxjs/toolkit";
import { default as userReducer } from "./slices/user";
import { default as noticeReducer } from "./slices/notice";
import { default as fortuneReducer } from "./slices/fortune";
import { default as projectReducer } from "./slices/project";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notice: noticeReducer,
    fortune: fortuneReducer,
    project: projectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
