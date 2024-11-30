import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";
import { CardStateType } from "@/core/types";

export const getStatus = createAsyncThunk(
  "card/getStatus",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("card", {
        headers: { "x-auth-token": token },
      });

      console.log(response);

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: CardStateType = {
  status: "idle",
  current: "silver",
  advantage: {},
  requirements: {},
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStatus.fulfilled, (state, { payload }) => {
        state.status = "successed";
        if (payload.current_card) {
          state.current = payload.current_card.toLoverCase();
        }
      })
      .addCase(getStatus.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cardSlice.reducer;
// export const {  } = noticeSlice.actions;
