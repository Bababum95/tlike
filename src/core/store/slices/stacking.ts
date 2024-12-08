import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
};

const stackingSlice = createSlice({
  name: "stacking",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {},
});

export default stackingSlice.reducer;
// export const {  } = taskSlice.actions;
