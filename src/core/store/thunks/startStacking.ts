import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { RootState } from "@/core/store";
import { api } from "@/core/api";

export const startStacking = createAsyncThunk(
  "stacking/startStacking",
  async (
    data: { currency: string; amount: number },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.post("/stacking/activate", data, {
        headers: { "x-auth-token": token },
      });

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          return rejectWithValue(err.response.data.message);
        }

        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error!");
    }
  }
);
