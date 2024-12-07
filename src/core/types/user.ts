import { StateStatusType } from "./abstract";

export type BalancesType = {
  like: number;
  love: number;
  ton: number;
  usdt: number;
};

export type ReferralType = {
  max_stats_photo_url: string;
  stats_user_id: string;
  sum_amount: number;
  sum_level_2: number;
};

export type NFTType = {
  id: number;
  nft_id: string;
  active: boolean;
  start_date: string;
  upd_date: string;
  user_id: string;
  in_account: boolean;
  image_url: string;
  nft_name: string;
  mining_speed_hour: number;
};

export type UpgradeType = {
  id: 1 | 2 | 3 | 4;
  costs: number;
  value: number;
  count: number;
};

export type UserType = {
  balances: BalancesType;
  mining_speed: {
    like: number;
    love_nft: number;
    love_upgrades: number;
  };
  token: string;
  type: "old" | "new";
  language: "en" | "ru";
  wallet: string | null;
  inventory: {
    costs: string;
    costs_currency: "Like";
    description: null;
    id: number;
    increase_currency: null;
    increase_value: string;
    item_name: string;
  }[];
  nfts: NFTType[];
  referal?: {
    amount: number;
    currency: "Love" | "Like";
    gift_id: number;
    inviter_id: string;
    status: "non-used" | "used" | "empty";
  };
  upgrades: UpgradeType[];
  referrals: ReferralType[];
};

export type UserStateType = {
  status: StateStatusType;
  error: null | string;
} & UserType;
