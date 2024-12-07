import { StateStatusType } from "./abstract";

export type FortuneStateType = {
  status: StateStatusType;
  spin_available: boolean;
  last_spin_time?: string;
  nextSpinTime?: string;
};
