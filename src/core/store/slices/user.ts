import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { InitDataParsed } from "@telegram-apps/sdk-react";

import { UserStateType } from "@types";
import { api } from "@/core/api";

const initialState: UserStateType = {
  status: "idle",
  balances: {
    tlike: 0,
    tlove: 0,
  },
  mining_speed: {
    tlike: 0,
    tlove: 0,
  },
  token: "",
  type: "new",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (data: InitDataParsed, { rejectWithValue }) => {
    try {
      const response = await api.post("telegram/front", data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.balances = action.payload.balances;
        state.mining_speed = action.payload.mining_speed;
        state.token = action.payload.token;
        state.type = action.payload.type;
        if (action.payload.photo) state.photo = action.payload.photo;
        state.status = "successed";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        // eslint-disable-next-line no-console
        console.log(action.payload);
      });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;