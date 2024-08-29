import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/core/store";
import { api } from "@/core/api";
import { HistoryStateType } from "@/core/types";

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async ({ page }: { page: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("/transactions/info", {
        headers: { "x-auth-token": token },
        params: { page },
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

export const getNotifications = createAsyncThunk(
  "history/getNotifications",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("/transfers/notifications", {
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
  records: [],
  notifications: [],
  total_pages: 0,
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
        state.records = action.payload.records;
        state.total_pages = action.payload.total_pages;
        state.status = "successed";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        if (action.payload.transfers) {
          state.notifications = action.payload.transfers;
        }
      });
  },
});

export default historySlice.reducer;
// export const {  } = historySlice.actions;
