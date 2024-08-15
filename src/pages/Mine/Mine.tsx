import { useState } from "react";
import { useTranslation } from "react-i18next";
import { initUtils } from "@telegram-apps/sdk";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

import { Balance, Empty, Navigation, User } from "@/components";
import {
  byNftImage,
  cableImprovementsImage,
  engineerImage,
  fanImage,
  waterCoolingImage,
} from "@images";

import styles from "./Mine.module.scss";
import { useParams } from "react-router-dom";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;

export const Mine = () => {
  const utils = initUtils();
  const params = useParams<{ tab?: "mining" | "upgrades" }>();
  const [tab, setTab] = useState(params.tab || "mining");
  const { t } = useTranslation("mine");

  const byNft = () => {
    utils.openLink(getgemsUrl);
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
      <Balance />
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
              <h2 className={styles.title}>{t("my-nfts")}</h2>
              <Empty title={t("no-nfts-title")}>
                <p>
                  {t("no-nfts-text")}
                  <span onClick={byNft}>{t("no-nfts-link")}</span>
                </p>
                <button className={styles["button-empty"]} onClick={byNft}>
                  {t("no-nfts-button")}
                </button>
              </Empty>
            </>
          ) : (
            <>
              <div className={styles.upgrade}>
                <motion.img
                  src={fanImage}
                  alt="Fan"
                  className={styles.image}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("fan")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>Amount: 0</p>
                </div>
              </div>
              <div className={styles.upgrade}>
                <motion.img
                  src={cableImprovementsImage}
                  alt="Cable improvements"
                  className={styles.image}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("cable-improvements")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>Amount: 0</p>
                </div>
              </div>
              <div className={styles.upgrade}>
                <motion.img
                  src={waterCoolingImage}
                  alt="Water cooling"
                  className={styles.image}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("water-cooling")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>Amount: 0</p>
                </div>
              </div>
              <div className={styles.upgrade}>
                <motion.img
                  src={engineerImage}
                  alt="Engineer"
                  className={styles.image}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("engineer")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>Amount: 0</p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <Navigation />
    </div>
  );
};
