import { createSlice } from "@reduxjs/toolkit";

import { checkTask, withdraw } from "@/core/store/thunks";
import type { NoticeStateType } from "@types";

const initialState: NoticeStateType = {
  status: "idle",
  message: "",
};

const setError = (state: NoticeStateType, message: any) => {
  state.status = "failed";
  if (typeof message === "string") {
    state.message = message;
  } else {
    state.message = "Error!";
  }
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice: (state, { payload }: { payload: NoticeStateType }) => {
      state.status = payload.status;
      state.message = payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkTask.rejected, (state, action) => {
        setError(state, action.payload);
      })
      .addCase(withdraw.fulfilled, (state) => {
        state.status = "successed";
        state.message = "Success!";
      })
      .addCase(withdraw.rejected, (state, action) => {
        setError(state, action.payload);
      });
  },
});

export default noticeSlice.reducer;
export const { setNotice } = noticeSlice.actions;
