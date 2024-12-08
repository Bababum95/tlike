import { createSlice } from "@reduxjs/toolkit";

import { StackingStateType } from "@types";

const initialState: StackingStateType = {
  status: "idle",
  preview: true,
};

const stackingSlice = createSlice({
  name: "stacking",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {},
});

export default stackingSlice.reducer;
// export const {  } = taskSlice.actions;
