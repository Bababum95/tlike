import { createSlice } from "@reduxjs/toolkit";

import type { TaskStateType } from "@/core/types";

import { getTasks, activateCalendarMission } from "@/core/store/thunks";

const initialState: TaskStateType = {
  status: "idle",
  calendar: {
    can_claim_today: false,
    current_day: 1,
    next_claim_date: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
    list: [],
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.status = "successed";

        state.calendar = {
          can_claim_today: payload.calendar.can_claim_today,
          current_day: payload.calendar.current_day,
          next_claim_date: payload.calendar.next_claim_date,
          list: payload.calendar.calendar,
        };
      })
      .addCase(activateCalendarMission.fulfilled, (state) => {
        state.calendar.can_claim_today = false;
      });
  },
});

export default taskSlice.reducer;
// export const {  } = noticeSlice.actions;
