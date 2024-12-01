import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("missions/calendar", {
        headers: { "x-auth-token": token },
      });

      if (response.status === 200) {
        const calendar = Array.isArray(response.data) ? response.data[0] : null;

        return { calendar };
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
