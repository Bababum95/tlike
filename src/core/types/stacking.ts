import { StateStatusType } from "./abstract";

/**
 * Represents the rate settings for a specific currency.
 */
type Rate = {
  /**
   * The currency name for which this rate applies.
   */
  currency: string;

  /**
   * Minimum value for the rate.
   * If no minimum exists, this field will be null.
   */
  min: number | null;

  /**
   * Maximum value for the rate.
   * If no maximum exists, this field will be null.
   */
  max: number | null;
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
   */
  enabled: boolean;

  /**
   * The stacking period in days.
   */
  period_days: number;

  /**
   * A list of exchange rates that are applicable to this stacking configuration.
   */
  rates: Rate[];

  /**
   * The minimum stake value required to participate in stacking.
   */
  min_stake: number;
};

/**
 * Represents the overall stacking state in the application.
 */
export type StackingStateType = {
  /**
   * The current status of the stacking state, typically represented
   * as a specific type imported from another module.
   */
  status: StateStatusType;

  /**
   * A flag indicating whether the preview mode is enabled.
   * In preview mode, changes can be displayed without persisting them.
   */
  preview: boolean;

  /**
   * An array of stacking settings for various currencies.
   */
  settings: StackingSettings[];
};
