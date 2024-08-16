import { stateStatus } from "./abstract";

type BalancesType = {
  tlike: number;
  tlove: number;
};

export type UserType = {
  balances: BalancesType;
  mining_speed: BalancesType;
  photo?: string;
  token: string;
  type: "old" | "new";
  language: "en" | "ru";
  wallet?: string;
};

export type UserStateType = {
  status: stateStatus;
  error: null | string;
} & UserType;
