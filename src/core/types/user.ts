import { stateStatus } from "./abstract";

type BalancesType = {
  tlike: number;
  tlove: number;
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
};

export type UpgradeType = {
  id: 1 | 2 | 3 | 4;
  costs: number;
  value: number;
  count: number;
};

export type MissionType = {
  id: number;
  description: string;
  award_amount: number;
  award_currency: string;
  icon_name: string;
  mission_actived: boolean;
  activation_date: string;
  redirect_url: string;
};

export type UserType = {
  balances: BalancesType;
  mining_speed: BalancesType;
  photo?: string;
  token: string;
  type: "old" | "new";
  language: "en" | "ru";
  wallet?: string;
  inventory: {
    costs: string;
    costs_currency: "TLike";
    description: null;
    id: number;
    increase_currency: null;
    increase_value: string;
    item_name: string;
  }[];
  missions: MissionType[];
  nfts: NFTType[];
  referal?: {
    amount: number;
    currency: "TLove" | "TLike";
    gift_id: number;
    inviter_id: string;
    status: "non-used" | "used" | "empty";
  };
  upgrades: UpgradeType[];
  referrals: ReferralType[]
};

export type UserStateType = {
  status: stateStatus;
  error: null | string;
} & UserType;
