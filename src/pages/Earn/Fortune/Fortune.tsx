import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { openLink, hapticFeedback } from "@telegram-apps/sdk-react";
import { useTonAddress } from "@tonconnect/ui-react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import classNames from "classnames";

import { setLastSpinTime, setTime } from "@/core/store/slices/fortune";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { api } from "@/core/api";
import { FORTUNE_WHEEL } from "@config";
import { Input, Toast } from "@/components";
import { addBalance } from "@/core/store/slices/user";

import styles from "./Fortune.module.scss";

type ParamsType = {
  type: "free" | "paid";
  currency?: "Love" | "Like";
};

type GiftInfoType = {
  amount: string;
  currency: string;
  description: string;
};

type InitToastesType = {
  win: boolean;
  by: {
    open: boolean;
    currency: "Love" | "Like";
    loading: boolean;
  };
};

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const initToastes: InitToastesType = {
  win: false,
  by: {
    open: false,
    currency: "Love",
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
  const [giftInfo, setGiftInfo] = useState<GiftInfoType | null>(null);
  const user = useAppSelector((state) => state.user);
  const fortuneStore = useAppSelector((state) => state.fortune);
  const dispatch = useAppDispatch();
  const address = useTonAddress(true);

  const closeToast = () => {
    setToastIsOpen(initToastes);
  };

  const spin = async (type: "free" | "paid") => {
    if (isSpinning) return;
    window.scrollTo(0, 0);
    setIsSpinning(true);
    setTargetIndex(null);
    setShowFierwork(false);
    closeToast();
    if (activeIndex > FORTUNE_WHEEL.length) setActiveIndex(0);

    const params: ParamsType = { type };

    if (type === "paid") {
      params.currency = toastIsOpen.by.currency;
      dispatch(
        addBalance({
          amount: toastIsOpen.by.currency === "Love" ? -5000 : -10,
          currency: toastIsOpen.by.currency,
        })
      );
    }

    try {
      const [response] = await Promise.all([
        api.get("fortune/spin", {
          headers: { "x-auth-token": user.token },
          params,
        }),
        delay(5000),
      ]);

      if (response.status === 200 && response.data.gift_info) {
        setTargetIndex(response.data.gift_id);
        setGiftInfo(response.data.gift_info);
        hapticFeedback.impactOccurred("medium");
        if (type === "free") {
          dispatch(setLastSpinTime(response.data.date));
        }
        if (
          response.data.gift_info.currency === "Love" ||
          response.data.gift_info.currency === "Like"
        ) {
          dispatch(
            addBalance({
              amount: Number(response.data.gift_info.amount),
              currency: response.data.gift_info.currency,
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
      hapticFeedback.impactOccurred("medium");
    }
  };

  const openBySpinToast = (currency: "Like" | "Love") => {
    setToastIsOpen((prev) => ({
      ...prev,
      by: { ...prev.by, open: true, currency },
    }));
  };

  const byNft = () => {
    openLink(getgemsUrl);
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
        if (
          FORTUNE_WHEEL[currentIndex].id === targetIndex &&
          intervalTime > 100
        ) {
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
    <main className={styles.page}>
      <motion.ul className={styles.wheel}>
        {FORTUNE_WHEEL.map((item, index) => (
          <motion.li
            key={item.id}
            animate={{
              opacity: [0, 1],
              scale: [0.8, 1],
            }}
            transition={{
              duration: 0.15,
              delay: index * 0.06,
            }}
            className={classNames(styles.item, {
              [styles.active]: index === activeIndex,
            })}
          >
            <div className={styles.background} />
            <span>{item.value}</span>
            <img src={item.icon} alt={item.value} width={56} height={48} />
          </motion.li>
        ))}
      </motion.ul>
      <h1 className={styles.title}>{t("fortune")}</h1>
      <p className={styles.text}>{t("fortune-text")}</p>
      <button
        onClick={() => spin("free")}
        className={classNames(
          styles.spin,
          { [styles.disabled]: !fortuneStore.spin_available },
          { [styles.loading]: isSpinning }
        )}
        disabled={!fortuneStore.spin_available}
      >
        {fortuneStore.spin_available
          ? t("spin-free")
          : fortuneStore.nextSpinTime}
      </button>
      {!fortuneStore.spin_available && (
        <div className={styles.nft}>
          <h2 className={styles.title}>{t("buy-spin")}</h2>
          <p className={styles.text}>{t("buy-spin-hint")}</p>
          <div className={styles.buttons}>
            <button
              className={classNames(styles.button, {
                [styles.disabled]: user.balances.like < 10,
              })}
              onClick={() => openBySpinToast("Like")}
            >
              10 LIKE
            </button>
            <button
              className={classNames(styles.button, {
                [styles.disabled]: user.balances.love < 5000,
              })}
              onClick={() => openBySpinToast("Love")}
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
            {giftInfo
              ? `${giftInfo.amount} ${giftInfo.currency}`
              : FORTUNE_WHEEL[activeIndex].value}
          </p>
          {giftInfo &&
            giftInfo.currency !== "Love" &&
            giftInfo.currency !== "Like" && (
              <div className={styles["toast-address"]}>
                <p className={styles["toast-hiint"]}>{t("win-hint")}</p>
                <Input
                  label={t("address")}
                  value={`${address.slice(0, 15)}.......${address.slice(-15)}`}
                  readOnly
                />
              </div>
            )}
          <button onClick={closeToast} className={styles.button}>
            {giftInfo &&
            giftInfo.currency !== "Love" &&
            giftInfo.currency !== "Like"
              ? t("take-reward")
              : t("confirm")}
          </button>
        </Toast>
      )}
      {showFierwork && (
        <Realistic onInit={({ conductor }) => conductor.shoot()} />
      )}
      <Toast isOpen={toastIsOpen.by.open} onClose={closeToast}>
        <p className={styles["toast-title"]}>{t("buy-spin")}</p>
        <p className={styles["toast-value"]}>
          {toastIsOpen.by.currency === "Like" ? "10 LIKE" : "5 000 LOVE"}
        </p>
        <button
          onClick={() => spin("paid")}
          className={classNames(styles.button, {
            [styles.loading]: toastIsOpen.by.loading,
          })}
        >
          {t("confirm")}
        </button>
      </Toast>
    </main>
  );
};
