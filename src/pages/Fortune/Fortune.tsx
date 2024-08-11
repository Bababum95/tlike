import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { initUtils } from "@telegram-apps/sdk";
import classNames from "classnames";

import { FORTUNE_WHEEL } from "@config";

import styles from "./Fortune.module.scss";
import { Toast } from "@/components";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;

export const Fortune = () => {
  const { t } = useTranslation("earn");
  const [activeIndex, setActiveIndex] = useState<number>(100);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(400);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const utils = initUtils();

  const closeToast = () => {
    setToastIsOpen(false);
  };

  const spin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTargetIndex(null);
    if (activeIndex > FORTUNE_WHEEL.length) setActiveIndex(0);

    try {
      const newTargetIndex = Math.floor(Math.random() * FORTUNE_WHEEL.length);

      setTimeout(() => {
        setTargetIndex(newTargetIndex);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const byNft = () => {
    utils.openLink(getgemsUrl);
  };

  useEffect(() => {
    if (!isSpinning) return;
    const interval = setInterval(() => {
      if (targetIndex === null && intervalTime > 200) {
        setIntervalTime(intervalTime - 25);
      } else if (targetIndex !== null && intervalTime < 400) {
        setIntervalTime(intervalTime + 25);
      }

      setActiveIndex((prev) => {
        const currentIndex = (prev + 1) % FORTUNE_WHEEL.length;
        if (currentIndex === targetIndex) {
          setIsSpinning(false);
          clearInterval(interval);
          setToastIsOpen(true);
        }
        return currentIndex;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isSpinning, targetIndex, intervalTime]);

  return (
    <div className={styles.page}>
      <motion.ul className={styles.wheel}>
        {FORTUNE_WHEEL.map((item, index) => (
          <motion.li
            key={item.value}
            className={classNames(styles.item, {
              [styles.active]: index === activeIndex,
            })}
          >
            <span>{item.value}</span>
            <img src={item.icon} alt={item.value} width={56} height={48} />
          </motion.li>
        ))}
      </motion.ul>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.text}>{t("fortune-text")}</p>
      <button
        onClick={spin}
        className={classNames(
          styles.spin,
          { [styles.disabled]: false },
          { [styles.loading]: isSpinning }
        )}
      >
        {t("spin")}
      </button>
      <div className={styles.nft}>
        <h2 className={styles.title}>{t("nft-title")}</h2>
        <p className={styles.text}>{t("nft-text")}</p>
        <button className={styles.button} onClick={byNft}>
          {t("nft-button")}
        </button>
      </div>
      {FORTUNE_WHEEL[activeIndex] && (
        <Toast isOpen={toastIsOpen} onClose={closeToast}>
          <img
            src={FORTUNE_WHEEL[activeIndex].icon}
            alt={FORTUNE_WHEEL[activeIndex].value}
            width={56}
            height={48}
            className={styles["toast-icon"]}
          />
          <p className={styles["toast-title"]}>{t("you-won")}</p>
          <p className={styles["toast-value"]}>
            {FORTUNE_WHEEL[activeIndex].value}
          </p>
          <button onClick={closeToast} className={styles.button}>
            {t("confirm")}
          </button>
        </Toast>
      )}
    </div>
  );
};
