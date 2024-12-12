import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import classNames from "classnames";

import type { OpenStacking as OpenStackingType } from "@types";
import { timeUtils } from "@/core/utils/timeUtils";

import styles from "./OpenStacking.module.scss";

/**
 * Formats a date string into a more readable format.
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} The formatted date string in the format "DD-MM-YYYY, HH:MM".
 * @example getFormattedDate("2023-10-01T14:30:00Z") // "01-10-2023, 14:30"
 */
const getFormattedDate = (date: string): string => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("ru-RU").replace(/\./g, "-");
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return `${formattedDate}, ${hours}:${minutes}`;
};

type Props = OpenStackingType & { delay?: number };

export const OpenStacking: FC<Props> = ({
  session_id,
  currency,
  staked_amount,
  start_date,
  end_date,
  rewards,
  is_completed,
  delay = 0,
}) => {
  const { t } = useTranslation("stacking");
  const [claimTime, setClaimTime] = useState<string>(
    timeUtils.getCountdown(end_date)
  );

  useEffect(() => {
    if (is_completed || claimTime === "00:00:00") return;

    const timer = setTimeout(() => {
      setClaimTime(timeUtils.getCountdown(end_date));
    }, 1000);

    return () => clearTimeout(timer);
  }, [end_date, is_completed, claimTime]);

  return (
    <motion.li
      key={session_id}
      className={styles.item}
      animate={{ opacity: [0, 1], y: [100, 0], scale: [0.8, 1] }}
      transition={{ duration: 0.25, delay: 0.15 + delay, type: "tween" }}
    >
      <div className={styles.background} />
      <div className={styles.row}>
        <img
          src={`/images/tokens/${currency.toLowerCase()}.webp`}
          width={26}
          height={28}
          className={styles.icon}
        />
        <p className={styles.title}>{t("title")}</p>
        <p className={styles.amount}>
          {staked_amount} {currency}
        </p>
      </div>
      <div className={styles.time}>
        <div className={styles.row}>
          <p className={styles.label}>Начало:</p>
          <p className={styles.value}>{getFormattedDate(start_date)}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Окончание:</p>
          <p className={styles.value}>{getFormattedDate(end_date)}</p>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.rewards}>
        {rewards.map((reward) => (
          <div className={styles.row} key={reward.currency}>
            <p className={styles.label}>{reward.currency}</p>
            <p className={styles.value}>
              {reward.amount > 0 && "+"}
              {new Intl.NumberFormat("ru-RU", {
                maximumFractionDigits: 2,
              }).format(reward.amount)}
            </p>
          </div>
        ))}
      </div>
      <button
        className={classNames("primary-button full", {
          disabled: !is_completed,
        })}
      >
        {is_completed ? "Забрать" : claimTime}
      </button>
    </motion.li>
  );
};
