import { createSlice } from "@reduxjs/toolkit";

import type { TaskStateType, TaskStatusType } from "@types";

import {
  activateCalendarMission,
  checkTask,
  getTasks,
  startTask,
} from "@/core/store/thunks";

const initialState: TaskStateType = {
  status: "idle",
  initial: [],
  daily: [],
  calendar: {
    can_claim_today: false,
    current_day: 1,
    next_claim_date: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
    list: [],
  },
};

const setTaskStatus = (
  state: TaskStateType,
  { id, type, status }: { id: number; type: "initial"; status: TaskStatusType }
) => {
  const task = state[type].find((t) => t.id === id);
  if (task) task.status = status;
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
      .addCase(startTask.pending, (state, action) => {
        setTaskStatus(state, { ...action.meta.arg, status: "loading" });
      })
      .addCase(startTask.fulfilled, (state, action) => {
        setTaskStatus(state, { ...action.meta.arg, status: "can-check" });
      })
      .addCase(checkTask.pending, (state, action) => {
        setTaskStatus(state, { ...action.meta.arg, status: "checking" });
      })
      .addCase(checkTask.rejected, (state, action) => {
        setTaskStatus(state, { ...action.meta.arg, status: "can-check" });
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.status = "successed";

        if (payload.calendar) {
          state.calendar = {
            can_claim_today: payload.calendar.can_claim_today,
            current_day: payload.calendar.current_day,
            next_claim_date: payload.calendar.next_claim_date,
            list: payload.calendar.calendar,
          };
        }

        if (payload.initial) {
          state.initial = payload.initial;
        }
      })
      .addCase(checkTask.fulfilled, (state, action) => {
        if (action.payload.mission_activated) {
          const task = state[action.meta.arg.type].find(
            (t) => t.id === action.meta.arg.id
          );
          if (task) {
            task.status = "successed";
            task.mission_actived = true;
          }
        }
      })
      .addCase(activateCalendarMission.fulfilled, (state) => {
        state.calendar.can_claim_today = false;
      });
  },
});

export default taskSlice.reducer;
// export const {  } = taskSlice.actions;
