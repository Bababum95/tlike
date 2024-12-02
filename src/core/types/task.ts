import { stateStatus } from "./abstract";

export type TaskStatusType =
  | "idle"
  | "loading"
  | "can-check"
  | "checking"
  | "successed";

type TaskType = {
  id: number;
  description: string;
  award_amount: number;
  award_currency: string;
  icon_name: string;
  mission_actived: boolean;
  activation_date: string;
  redirect_url: string;
  status: TaskStatusType;
  mission_type: "link" | "telegram_check";
};

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
  initial: TaskType[];
};
