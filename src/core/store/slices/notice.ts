import { createSlice } from "@reduxjs/toolkit";

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
});

export default noticeSlice.reducer;
export const { setNotice } = noticeSlice.actions;
