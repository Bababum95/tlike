import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const [calendarResponse, initialResponse] = await Promise.all([
        api.get("/missions/calendar", {
          headers: { "x-auth-token": token },
        }),
        api.get("/missions", { headers: { "x-auth-token": token } }),
      ]);

      const output: { calendar: any; initial: any } = {
        calendar: null,
        initial: null,
      };

      if (calendarResponse.status === 200) {
        const calendar = Array.isArray(calendarResponse.data)
          ? calendarResponse.data[0]
          : null;

        output.calendar = calendar;
      }

      if (initialResponse.status === 200) {
        output.initial = initialResponse.data;
      }

      return output;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
