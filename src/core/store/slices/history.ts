import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/core/store";
import { api } from "@/core/api";
import { HistoryStateType } from "@/core/types";

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("/transactions/info", {
        headers: { "x-auth-token": token },
      });
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        const errorWithResponse = err as {
          response?: { data?: { message?: string } };
        };

        if (errorWithResponse.response?.data?.message) {
          return rejectWithValue(errorWithResponse.response.data.message);
        }

        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error!");
    }
  }
);

const initialState: HistoryStateType = {
  status: "idle",
  data: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.data = action.payload.reverse();
        state.status = "successed";
      });
  },
});

export default historySlice.reducer;
// export const {  } = historySlice.actions;
