import { stateStatus } from "./abstract";

export type ProjectStateType = {
  status: stateStatus;
  stat: {
    active_users: string;
    like_mined: number;
    love_earned: number;
    love_burned: number;
    like_burned: number;
    next_halving: string;
  };
};
