import { stateStatus } from "./abstract";

export type FortuneStateType = {
  status: stateStatus;
  spin_available: boolean;
  last_spin_time?: string;
  nextSpinTime?: string;
};
