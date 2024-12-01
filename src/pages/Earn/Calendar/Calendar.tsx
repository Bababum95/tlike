import { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { TOKENS } from "@config";
import { useAppSelector } from "@hooks";
import { Slider, Toast } from "@/components";

import styles from "./Calendar.module.scss";

export const Calendar = () => {
  const { t } = useTranslation("earn");
  const { calendar } = useAppSelector((state) => state.task);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const currentDay = calendar.list.find(
    (item) => item.calendar_day === calendar.current_day
  );

  const closeToast = () => {
    setToastIsOpen(false);
  };

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
            className={styles.button}
            onClick={() => setToastIsOpen(true)}
          >
            Получить
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
          Награда за <span>{calendar.current_day} {t("day")}</span>!
        </p>
        <p className="toast-value">
          +{" "}
          {new Intl.NumberFormat("ru-RU").format(currentDay?.award_amount || 0)}{" "}
          {currentDay?.award_currency}
        </p>
        <button onClick={closeToast} className={styles.button}>
          Забрать
        </button>
      </Toast>
    </motion.main>
  );
};
