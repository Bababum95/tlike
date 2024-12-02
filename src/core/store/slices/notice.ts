import { createSlice } from "@reduxjs/toolkit";

import { checkTask } from "@/core/store/thunks";

const initialState = {
  status: "idle",
  message: "",
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkTask.rejected, (state, action) => {
      state.status = "error";

      const payload = action.payload as any;

      if (payload.response?.data?.message) {
        state.message = payload.response.data.message;
      } else {
        state.message = "An unknown error occurred.";
      }
    });
  },
});

export default noticeSlice.reducer;
export const { setNotice } = noticeSlice.actions;
