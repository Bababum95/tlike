import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import classNames from "classnames";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

import type { UpgradeType } from "@types";
import { Toast, BalanceItem, Link } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { byUpgrade as fetchByUpgrade } from "@/core/store/slices/user";
import { setNotice } from "@/core/store/slices/notice";

import { Upgrade } from "./Upgrade";
import styles from "./Upgrades.module.scss";

export const Upgrades = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("mine");
  const [toast, setToast] = useState<UpgradeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const byUpgrade = async () => {
    if (!toast) return;

    setLoading(true);
    dispatch(
      setNotice({ status: "loading", message: "Request Processing..." })
    );

    try {
      await dispatch(fetchByUpgrade({ id: toast.id })).unwrap();
      dispatch(setNotice({ status: "successed", message: "Success!" }));
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    } catch (err) {
      dispatch(setNotice({ status: "failed", message: err as string }));
    } finally {
      setLoading(false);
      setToast(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <video
          src="/animations/love.webm"
          autoPlay={true}
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          preload="auto"
          className={styles.love}
        >
          <source
            src="/animations/love.webm"
            type="video/webm"
            data-wf-ignore="true"
          />
        </video>
        <Link to="/wallet" className={styles.balance}>
          <BalanceItem
            name="love"
            mining={user.mining_speed.love_upgrades * 3600}
            maximumFractionDigits={0}
          />
        </Link>
        <ul className={styles.list}>
          {user.upgrades.map((upgrade) => (
            <Upgrade
              key={upgrade.id}
              id={upgrade.id}
              value={upgrade.value}
              count={upgrade.count}
              costs={upgrade.costs}
              handleBuy={() => setToast(upgrade)}
            />
          ))}
        </ul>
        <Toast isOpen={!!toast} onClose={() => setToast(null)}>
          <div className={styles.toast}>
            {!!toast && (
              <>
                <video
                  className={styles.image}
                  src={`/animations/upgrades/${toast.id}.webm`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  data-wf-ignore="true"
                  data-object-fit="cover"
                  preload="auto"
                  width={157}
                  height={157}
                  poster={`/images/upgrades/${toast.id}.webp`}
                >
                  <source
                    src={`/animations/upgrades/${toast.id}.webm`}
                    type="video/webm"
                    data-wf-ignore="true"
                  />
                </video>
                <h2 className={styles.title}>
                  {t(`upgrade-list.${toast.id}.name`)}
                </h2>
                <p className={styles.description}>
                  {t(`upgrade-list.${toast.id}.description`)}
                </p>
                <p className={styles.text}>{t("profit-per-hour")}</p>
                <p className={styles.speed}>
                  +
                  {new Intl.NumberFormat("ru-RU", {
                    maximumFractionDigits: 0,
                  }).format(toast.value)}{" "}
                  Love/h
                </p>
                <p className={styles.price}>
                  {new Intl.NumberFormat("ru-RU", {
                    maximumFractionDigits: 0,
                  }).format(toast.costs)}{" "}
                  Like
                </p>
                <button
                  className={classNames(styles.button, {
                    [styles.loading]: loading,
                    [styles.disabled]: user.balances.like < toast.costs,
                  })}
                  onClick={byUpgrade}
                >
                  {t("buy")}
                </button>
              </>
            )}
          </div>
        </Toast>
        {showConfetti && (
          <Realistic onInit={({ conductor }) => conductor.shoot()} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
