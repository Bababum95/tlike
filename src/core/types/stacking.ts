import { StateStatusType } from "./abstract";

/**
 * Represents the rate settings for a specific currency.
 */
export type StackingRate = {
  /**
   * The currency name for which this rate applies.
   * For example: "Like", "Love", "USDT", etc.
   */
  currency: string;

  /**
   * Minimum value for the rate.
   * If no minimum exists, this field will be null.
   *
   * @example 10
   */
  min: number | null;

  /**
   * Maximum value for the rate.
   * If no maximum exists, this field will be null.
   *
   * @example 100
   */
  max: number | null;

  /**
   * The exchange rate for the currency.
   * This defines the conversion rate for rewards.
   *
   * @example 1.5
   */
  exchange_rate: number;
};

/**
 * Represents stacking settings for a specific currency.
 */
export type StackingSettings = {
  /**
   * The name of the currency (e.g., "Like", "Love", "USDT").
   */
  currency: string;

  /**
   * Indicates whether stacking for this currency is enabled.
   *
   * @example true
   */
  enabled: boolean;

  /**
   * The stacking period in days.
   * This defines the lock-in duration for stacking funds.
   *
   * @example 14
   */
  period_days: number;

  /**
   * A list of exchange rates that are applicable to this stacking configuration.
   * Each entry defines the minimum, maximum, and exchange rate for the currency.
   */
  rates: StackingRate[];

  /**
   * The minimum stake value required to participate in stacking.
   *
   * @example 50
   */
  min_stake: number;
};

/**
 * Represents a reward for a specific stacking session.
 */
type Reward = {
  /**
   * The reward amount distributed during the session.
   *
   * @example 0.00547265
   */
  amount: number;

  /**
   * The currency in which the reward is issued.
   *
   * @example "Like"
   */
  currency: string;
};

/**
 * Represents an open stacking session.
 */
export type OpenStacking = {
  /**
   * Unique identifier for the stacking session.
   *
   * @example 29
   */
  session_id: number;

  /**
   * The currency that is staked in this session.
   *
   * @example "USDT"
   */
  currency: string;

  /**
   * The amount that has been staked in the session.
   *
   * @example 100
   */
  staked_amount: number;

  /**
   * The start date and time of the session in ISO format.
   *
   * @example "2024-12-11T14:21:38.644Z"
   */
  start_date: string;

  /**
   * The end date and time of the session in ISO format.
   *
   * @example "2024-12-25T14:21:38.645Z"
   */
  end_date: string;

  /**
   * Indicates whether the session has been completed.
   *
   * @example false
   */
  is_completed: boolean;

  /**
   * An array of rewards associated with this session.
   * Each reward specifies the amount and currency issued.
   */
  rewards: Reward[];
};

/**
 * Represents the overall stacking state in the application.
 */
export type StackingStateType = {
  /**
   * The current status of the stacking state, typically represented
   * as a specific type imported from another module.
   *
   * @example "idle" | "loading" | "error" | "success"
   */
  status: StateStatusType;

  /**
   * A flag indicating whether the preview mode is enabled.
   * In preview mode, changes can be displayed without persisting them.
   *
   * @example true
   */
  preview: boolean;

  /**
   * An array of stacking settings for various currencies.
   * Each entry specifies the configuration for one currency.
   */
  settings: StackingSettings[];

  /**
   * An array of currently open stacking sessions.
   * Each session includes details such as the staked amount,
   * session duration, and rewards issued.
   */
  open: OpenStacking[];
};
