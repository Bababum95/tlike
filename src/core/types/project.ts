import { StateStatusType } from "./abstract";

export type ProjectStateType = {
  status: StateStatusType;
  stat: {
    active_users: string;
    like_mined: number;
    love_earned: number;
    love_burned: number;
    like_burned: number;
    next_halving: string;
  };
  commissions: {
    currency: string;
    network: "TON" | "TRC20";
    id: number;
    fixed_fee: number;
    min_withdrawal: number;
  }[];
};
