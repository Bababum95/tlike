import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";
import { FortuneStateType } from "@types";

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
  const currentTime = new Date();
  const timeDifference = futureTime.getTime() - currentTime.getTime();

  if (timeDifference > 0) {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    state.nextSpinTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    state.nextSpinTime = "00:00:00";
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkTime.fulfilled, (state, action) => {
        console.log(action.payload);
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
export const { setTime } = fortuneSlice.actions;
