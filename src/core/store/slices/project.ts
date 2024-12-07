import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";
import type { ProjectStateType } from "@types";

export const getProjectStat = createAsyncThunk(
  "project/getProjectStat",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("project/stat", {
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

export const getCommission = createAsyncThunk(
  "project/getCommission",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("withdraw/commission", {
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

const initialState: ProjectStateType = {
  status: "idle",
  commissions: [],
  stat: {
    active_users: "1",
    like_mined: 0,
    love_earned: 0,
    love_burned: 0,
    like_burned: 0,
    next_halving: "",
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectStat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectStat.fulfilled, (state, action) => {
        state.status = "successed";
        state.stat = action.payload;
      })
      .addCase(getProjectStat.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCommission.fulfilled, (state, action) => {
        state.status = "successed";
        state.commissions = action.payload.commission;
      });
  },
});

export default projectSlice.reducer;
// export const { } = projectSlice.actions;
