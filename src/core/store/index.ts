import { configureStore } from "@reduxjs/toolkit";

import { default as fortuneReducer } from "./slices/fortune";
import { default as historyReducer } from "./slices/history";
import { default as noticeReducer } from "./slices/notice";
import { default as projectReducer } from "./slices/project";
import { default as userReducer } from "./slices/user";

export const store = configureStore({
  reducer: {
    fortune: fortuneReducer,
    history: historyReducer,
    notice: noticeReducer,
    project: projectReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
