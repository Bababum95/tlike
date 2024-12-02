import { createAsyncThunk } from "@reduxjs/toolkit";

export const startTask = createAsyncThunk(
  "task/startTask",
  async (options: { id: number; type: "initial" }) => {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    return options;
  }
);
