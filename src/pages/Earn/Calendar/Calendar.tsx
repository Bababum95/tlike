import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { TOKENS } from "@config";
import { useAppSelector, useAppDispatch } from "@hooks";
import { Slider, Toast } from "@/components";

import { activateCalendarMission } from "@/core/store/thunks";
import { timeUtils } from "@/core/utils/timeUtils";

import styles from "./Calendar.module.scss";

export const Calendar = () => {
  const { calendar } = useAppSelector((state) => state.task);
  const { t } = useTranslation("earn");
  const dispatch = useAppDispatch();

  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [nextClaimTime, setNextClaimTime] = useState<string>(
    timeUtils.getCountdown(calendar.next_claim_date)
  );

  const currentDay = calendar.list.find(
    (item) => item.calendar_day === calendar.current_day
  );

  const closeToast = () => {
    setToastIsOpen(false);
  };

  const handleClaim = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const button = evt.target as HTMLButtonElement;
    button.classList.add("loading");

    await dispatch(activateCalendarMission());

    button.classList.remove("loading");
    setToastIsOpen(false);
  };

  useEffect(() => {
    if (calendar.can_claim_today) return;

    setTimeout(() => {
      setNextClaimTime(timeUtils.getCountdown(calendar.next_claim_date));
    }, 1000);
  }, [calendar.can_claim_today, nextClaimTime]);

  return (
    <motion.main
      className={styles.main}
      animate={{ opacity: [0, 1], y: [70, 0] }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.wrapper}>
        <div className={styles.calendar}>
          <ul className={styles.list}>
            {calendar.list.map((item, index) => (
              <motion.li
                key={item.calendar_day + " day"}
                className={classNames(styles.item, {
                  [styles.claimed]: item.claimed,
                  [styles.current]: item.calendar_day === calendar.current_day,
                })}
                animate={{
                  opacity: [0, 1],
                  scale: [0.8, 1],
                }}
                transition={{
                  duration: 0.15,
                  delay: index * 0.06,
                }}
              >
                <div className={styles.background} />
                <p className={styles.day}>
                  {item.calendar_day} {t("day")}
                </p>
                <img
                  src={
                    TOKENS.find((t) => t.name === item.award_currency)?.icon ||
                    "/images/tokens/love.webp"
                  }
                  width={26}
                  height={28}
                  alt={item.award_currency}
                />
                <p className={styles.amount}>
                  {new Intl.NumberFormat("ru-RU").format(item.award_amount)}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className={styles.claim}>
          <p className={styles.text}>
            Забирайте награду каждый день за вход в приложение
          </p>
          <button
            className={classNames("primary-button full", {
              disabled: !calendar.can_claim_today,
            })}
            onClick={() => setToastIsOpen(true)}
          >
            {calendar.can_claim_today ? "Получить" : nextClaimTime}
          </button>
        </div>
      </div>
      <Slider />

      <Toast isOpen={toastIsOpen} onClose={closeToast}>
        <img
          src={
            TOKENS.find((t) => t.name === currentDay?.award_currency)?.icon ||
            "/images/tokens/love.webp"
          }
          alt={currentDay?.award_currency}
          width={102}
          height={110}
          className="toast-icon"
        />
        <p className="toast-description">
          Награда за{" "}
          <span>
            {calendar.current_day} {t("day")}
          </span>
          !
        </p>
        <p className="toast-value">
          +{" "}
          {new Intl.NumberFormat("ru-RU").format(currentDay?.award_amount || 0)}{" "}
          {currentDay?.award_currency}
        </p>
        <button onClick={handleClaim} className="primary-button full">
          Забрать
        </button>
      </Toast>
    </motion.main>
  );
};
