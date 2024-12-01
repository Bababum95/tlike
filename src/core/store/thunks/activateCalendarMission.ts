import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";

interface CalendarMissionResponse {
  status: string;
  calendar_mission_activated: boolean;
  award?: {
    amount: number;
    currency: string;
    current_day: number;
  };
}

export const activateCalendarMission = createAsyncThunk(
  "task/activateCalendarMission",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.post<CalendarMissionResponse>(
        "missions/calendar",
        {},
        { headers: { "x-auth-token": token } }
      );

      if (response.status === 200) {
        return response.data;
      }

      return rejectWithValue(response.data);
    } catch (err: any) {
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({
        message: "Failed to activate calendar mission",
      });
    }
  }
);
