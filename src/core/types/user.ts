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
};

export type UserStateType = {
  status: "idle" | "loading" | "failed" | "successed";
  error: null | string;
} & UserType;
