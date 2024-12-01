import { stateStatus } from "./abstract";

export type TaskStateType = {
  status: stateStatus;
  calendar: {
    can_claim_today: boolean;
    current_day: number;
    next_claim_date: string;
    list: {
      calendar_day: number;
      award_currency: "Love";
      award_amount: number;
      icon_name: string;
      claimed: boolean;
    }[];
  };
};
