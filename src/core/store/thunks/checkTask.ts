import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/core/api";
import { RootState } from "@/core/store";

export const checkTask = createAsyncThunk(
  "task/checkTask",
  async ({ id }: { id: number; type: "initial" }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.post(
        "/missions",
        { mission_id: id },
        { headers: { "x-auth-token": token } }
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
