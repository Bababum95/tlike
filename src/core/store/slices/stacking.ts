import { createSlice } from "@reduxjs/toolkit";

import type { StackingStateType } from "@types";
import { getStackingInfo, startStacking } from "@/core/store/thunks";

const initialState: StackingStateType = {
  status: "idle",
  preview: true,
  settings: [],
  open: [],
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
    builder
      .addCase(getStackingInfo.fulfilled, (state, action) => {
        state.settings = action.payload.stacking_settings;
        state.open = action.payload.open_stackings;
      })
      .addCase(startStacking.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
      });
  },
});

export default stackingSlice.reducer;
export const { hidePreview } = stackingSlice.actions;
