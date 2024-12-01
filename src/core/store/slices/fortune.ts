import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";
import { FortuneStateType } from "@types";
import { timeUtils } from "@/core/utils/timeUtils";

export const checkTime = createAsyncThunk(
  "fortune/checkTime",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("fortune/time", {
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const setNextTime = (state: FortuneStateType) => {
  if (!state.last_spin_time) return;

  const initialTime = new Date(state.last_spin_time);
  const futureTime = new Date(initialTime.getTime() + 6 * 60 * 60 * 1000);

  const countdown = (state.nextSpinTime = timeUtils.getCountdown(
    futureTime.toISOString()
  ));

  state.nextSpinTime = countdown;

  if (countdown === "00:00:00") {
    state.spin_available = true;
  }
};

const initialState: FortuneStateType = {
  status: "idle",
  spin_available: false,
};

const fortuneSlice = createSlice({
  name: "fortune",
  initialState,
  reducers: {
    setTime(state) {
      setNextTime(state);
    },
    setLastSpinTime(state, action: PayloadAction<string>) {
      state.last_spin_time = action.payload;
      state.spin_available = false;
      setNextTime(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkTime.fulfilled, (state, action) => {
        state.status = "successed";
        state.spin_available = action.payload.spin_available;

        if (action.payload.last_spin_time) {
          state.last_spin_time = action.payload.last_spin_time;
          if (!action.payload.spin_available) {
            setNextTime(state);
          }
        }
      })
      .addCase(checkTime.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default fortuneSlice.reducer;
export const { setTime, setLastSpinTime } = fortuneSlice.actions;
