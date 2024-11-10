import { FC, useState} from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { openLink } from "@telegram-apps/sdk-react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

import { UPGRADES } from "@config";
import { Balance, Empty, Navigation, Toast, User, Link } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { NFTType, UpgradeType } from "@types";
import { byNftImage } from "@images";
import { api } from "@/core/api";
import {
  changeStatusNFT,
  byUpgrade as fetchByUpgrade,
} from "@/core/store/slices/user";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./Mine.module.scss";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;

export const Mine: FC = () => {
  const params = useParams<{ tab?: "mining" | "upgrades" }>();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("mine");
  const [tab, setTab] = useState(params.tab || "mining");
  const [toast, setToast] = useState<UpgradeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false); // Состояние для конфетти

  const byNft = () => {
    openLink(getgemsUrl);
  };

  const byUpgrade = async () => {
    if (!toast) return;

    setLoading(true);
    dispatch(
      setNotice({ status: "loading", message: "Request Processing..." })
    );

    try {
      await dispatch(fetchByUpgrade({ id: toast.id })).unwrap();
      dispatch(setNotice({ status: "success", message: "Success!" }));
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    } catch (err) {
      dispatch(setNotice({ status: "error", message: err }));
    } finally {
      setLoading(false);
      setToast(null);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <User />
        <div className={styles.buttons}>
          <motion.div
            layoutId="background"
            className={classNames(styles.background, styles[tab])}
          />
          <button className={styles.button} onClick={() => setTab("mining")}>
            {t("mining")}
          </button>
          <button className={styles.button} onClick={() => setTab("upgrades")}>
            {t("upgrades")}
          </button>
        </div>
      </header>
      <Link to="/wallet">
        <Balance />
      </Link>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.main}
          key={tab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "mining" ? (
            <>
              <img
                src={byNftImage}
                alt="By NFT"
                className={styles["by-nft"]}
                onClick={byNft}
              />
              <div className={styles["title-container"]}>
                <h2 className={styles.title}>{t("my-nfts")}</h2>
                {user.nfts.length && (
                  <p className={styles.counter}>
                    {t("amount-short")}: {user.nfts.length}
                  </p>
                )}
              </div>
              {user.nfts.length ? (
                <ul className={styles.list}>
                  {user.nfts.map((nft) => (
                    <NFT key={nft.id} nft={nft} />
                  ))}
                </ul>
              ) : (
                <Empty title={t("no-nfts-title")}>
                  <p>
                    {t("no-nfts-text")}
                    <span onClick={byNft}>{t("no-nfts-link")}</span>
                  </p>
                  <button className={styles["button-empty"]} onClick={byNft}>
                    {t("no-nfts-button")}
                  </button>
                </Empty>
              )}
            </>
          ) : (
            <>
              {user.upgrades.map((upgrade) => (
                <div className={styles.upgrade} key={upgrade.id}>
                  <motion.img
                    src={UPGRADES[upgrade.id].image}
                    alt="Fan"
                    className={styles.image}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [0.5, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                    width={83}
                    height={78}
                  />
                  <div className={styles.info}>
                    <h2 className={styles.title}>
                      {t(UPGRADES[upgrade.id].name)}
                    </h2>
                    <p className={styles.price}>
                      {new Intl.NumberFormat("ru-RU", {
                        maximumFractionDigits: 0,
                      }).format(upgrade.costs)}{" "}
                      Like
                    </p>
                    <p className={styles.text}>
                      +
                      {new Intl.NumberFormat("ru-RU", {
                        maximumFractionDigits: 0,
                      }).format(upgrade.value)}{" "}
                      Love/h
                    </p>
                  </div>
                  <div className={styles.action}>
                    <button
                      className={classNames(styles.button)}
                      onClick={() => setToast(upgrade)}
                    >
                      {t("buy")}
                    </button>
                    <p className={styles.amount}>
                      {t("amount")}: {upgrade.count}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <Navigation />
      <Toast isOpen={!!toast} onClose={() => setToast(null)}>
        <div className={styles.toast}>
          {!!toast && (
            <>
              <motion.img
                src={UPGRADES[toast.id].image}
                alt="Fan"
                className={styles.image}
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.3, delay: 0.2 }}
                width={83}
                height={78}
              />
              <h2 className={styles.title}>{t(UPGRADES[toast.id].name)}</h2>
              <p className={styles.description}>
                {t(`${UPGRADES[toast.id].name}-description`)}
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
    </div>
  );
};

const NFT: FC<{ nft: NFTType }> = ({ nft }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("mine");
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const toggleNft = async () => {
    dispatch(
      setNotice({ status: "loading", message: "Request Processing..." })
    );
    setLoading(true);
    try {
      const response = await api.put(
        "/nft/change_status",
        {
          nft_id: nft.nft_id,
          active: !nft.active,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      if (response.status === 200) {
        dispatch(
          changeStatusNFT({
            nft_id: response.data.nft.nft_id,
            active: response.data.nft.active,
          })
        );
        dispatch(setNotice({ status: "success", message: "Success!" }));
      }
    } catch (err) {
      console.log(err);
      dispatch(setNotice({ status: "error", message: "Error!" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <li key={nft.id} className={styles.item}>
      <p className={styles.name}>{nft.nft_name}</p>
      <motion.img
        className={styles.nft}
        src={nft.image_url}
        alt={nft.nft_name}
        animate={{ scale: [0.5, 1.2, 1] }}
      />
      <p className={styles.speed}>
        + {Number(nft.mining_speed_hour).toFixed(0)} Like/h
      </p>
      <button
        className={classNames(styles.start, {
          [styles.stop]: nft.active,
          [styles.loading]: loading,
        })}
        onClick={toggleNft}
      >
        {t(!nft.active ? "start" : "stop")}
      </button>
    </li>
  );
};