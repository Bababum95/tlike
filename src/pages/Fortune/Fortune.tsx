import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { initUtils, initHapticFeedback } from "@telegram-apps/sdk";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import classNames from "classnames";

import { setLastSpinTime, setTime } from "@/core/store/slices/fortune";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { api } from "@/core/api";
import { FORTUNE_WHEEL } from "@config";
import { Toast } from "@/components";

import styles from "./Fortune.module.scss";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;
const initToastes = {
  win: false,
  by: {
    open: false,
    currency: "TLove",
    loading: false,
  },
};

export const Fortune = () => {
  const { t } = useTranslation("earn");
  const [activeIndex, setActiveIndex] = useState<number>(100);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(200);
  const [toastIsOpen, setToastIsOpen] = useState(initToastes);
  const [showFierwork, setShowFierwork] = useState<boolean>(false);
  const token = useAppSelector((state) => state.user.token);
  const fortuneStore = useAppSelector((state) => state.fortune);
  const utils = initUtils();
  const haptic = initHapticFeedback();
  const dispatch = useAppDispatch();

  const closeToast = () => {
    setToastIsOpen(initToastes);
  };

  const spin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTargetIndex(null);
    setShowFierwork(false);
    if (activeIndex > FORTUNE_WHEEL.length) setActiveIndex(0);

    try {
      const response = await api.get("fortune/spin", {
        headers: {
          "x-auth-token": token,
        },
        params: {
          type: "free",
        },
      });

      if (response.status === 200 && response.data.status === "new") {
        setTargetIndex(response.data.gift_id - 1);
        haptic.impactOccurred("medium");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const openBySpinToast = (currency: "TLike" | "TLove") => {
    setToastIsOpen((prev) => ({
      ...prev,
      by: { ...prev.by, open: true, currency },
    }));
  };

  const bySpin = async () => {
    setToastIsOpen((prev) => ({ ...prev, by: { ...prev.by, loading: true } }));
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const [response] = await Promise.all([
        api.get("fortune/spin", {
          headers: {
            "x-auth-token": token,
          },
          params: {
            type: "paid",
            currency: toastIsOpen.by.currency,
          },
        }),
        delay(5000),
      ]);

      if (response.status === 200 && response.data.date) {
        dispatch(setLastSpinTime(response.data.date));
      }
    } finally {
      setToastIsOpen((prev) => ({
        ...prev,
        by: { ...prev.by, loading: false },
      }));
    }
  };

  const byNft = () => {
    utils.openLink(getgemsUrl);
  };

  useEffect(() => {
    if (!isSpinning) return;
    const interval = setInterval(() => {
      if (targetIndex === null && intervalTime > 50) {
        setIntervalTime(intervalTime - 25);
      } else if (targetIndex !== null && intervalTime < 200) {
        setIntervalTime(intervalTime + 35);
      }

      setActiveIndex((prev) => {
        const currentIndex = (prev + 1) % FORTUNE_WHEEL.length;
        if (currentIndex === targetIndex) {
          setIsSpinning(false);
          clearInterval(interval);
          setToastIsOpen((prev) => ({ ...prev, win: true }));
          setShowFierwork(true);
        }
        return currentIndex;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isSpinning, targetIndex, intervalTime]);

  useEffect(() => {
    if (fortuneStore.spin_available) return;
    setTimeout(() => {
      dispatch(setTime());
    }, 1000);
  }, [fortuneStore.spin_available, fortuneStore.nextSpinTime]);

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
          { [styles.disabled]: !fortuneStore.spin_available },
          { [styles.loading]: isSpinning }
        )}
        disabled={!fortuneStore.spin_available}
      >
        {fortuneStore.spin_available ? t("spin") : fortuneStore.nextSpinTime}
      </button>
      {!fortuneStore.spin_available && (
        <div className={styles.nft}>
          <h2 className={styles.title}>{t("buy-spin")}</h2>
          <p className={styles.text}>{t("buy-spin-hint")}</p>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => openBySpinToast("TLike")}
            >
              100 LIKE
            </button>
            <button
              className={styles.button}
              onClick={() => openBySpinToast("TLove")}
            >
              5 000 LOVE
            </button>
          </div>
        </div>
      )}
      <div className={styles.nft}>
        <h2 className={styles.title}>{t("nft-title")}</h2>
        <p className={styles.text}>{t("nft-text")}</p>
        <button className={styles.button} onClick={byNft}>
          {t("nft-button")}
        </button>
      </div>
      {FORTUNE_WHEEL[activeIndex] && (
        <Toast isOpen={toastIsOpen.win} onClose={closeToast}>
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
      {showFierwork && (
        <Realistic onInit={({ conductor }) => conductor.shoot()} />
      )}
      <Toast isOpen={toastIsOpen.by.open} onClose={closeToast}>
        <p className={styles["toast-title"]}>{t("buy-spin")}</p>
        <p className={styles["toast-value"]}>
          {toastIsOpen.by.currency === "TLike" ? "100 LIKE" : "5 000 LOVE"}
        </p>
        <button
          onClick={bySpin}
          className={classNames(styles.button, {
            [styles.loading]: toastIsOpen.by.loading,
          })}
        >
          {t("confirm")}
        </button>
      </Toast>
    </div>
  );
};
