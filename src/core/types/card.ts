import { StateStatusType } from "./abstract";

export type CardType = "silver" | "gold" | "platinum";

export type CardStateType = {
  status: StateStatusType;
  current: CardType;
  advantages: {
    [key: string]: {
      card_type: string;
      conversion_fee: number;
      usdt_fee: number;
      like_fee: number;
      love_fee: number;
      ton_fee: number;
      stacking_requirement: number | null;
      nft_requirement: number | null;
    };
  };
  requirements: {
    [key: string]: {
      nft_count_is_completed: boolean;
      stacked_usdt_is_completed: boolean;
      platinum_nft?: boolean;
    };
  };
};
