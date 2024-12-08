import { createSlice } from "@reduxjs/toolkit";

import type { StackingStateType } from "@types";
import { getStackingInfo } from "@/core/store/thunks";

const initialState: StackingStateType = {
  status: "idle",
  preview: true,
  settings: [],
};

const stackingSlice = createSlice({
  name: "stacking",
  initialState,
  reducers: {
    hidePreview: (state) => {
      state.preview = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStackingInfo.fulfilled, (state, action) => {
      state.settings = action.payload.stacking_settings;
    });
  },
});

export default stackingSlice.reducer;
export const { hidePreview } = stackingSlice.actions;
