import { stateStatus } from "./abstract";

export type CardType = "silver" | "gold" | "platinum";

export type CardStateType = {
  status: stateStatus;
  current: CardType;
  advantage: {
    [key: string]: {
      card_type: string;
      conversion_fee: string;
      usdt_fee: string;
      like_fee: string;
      love_fee: string;
      ton_fee: string;
      stacking_requirement: string | null;
      nft_requirement: number | null;
      like_transfer_fee: string;
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
