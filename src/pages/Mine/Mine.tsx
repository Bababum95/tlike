import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import { Balance, Navigation, User } from "@/components";
import { byNftImage, nftEmptyImage } from "@images";

import styles from "./Mine.module.scss";
import classNames from "classnames";

export const Mine = () => {
  const [tab, setTab] = useState("mining");
  const { t } = useTranslation("mine");

  const byNft = () => {
    console.log("clicked");
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
            Mining
          </button>
          <button className={styles.button} onClick={() => setTab("upgrades")}>
            Upgrades
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
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "mining" && (
            <>
              <img
                src={byNftImage}
                alt="By NFT"
                className={styles["by-nft"]}
                onClick={byNft}
              />
              <h2 className={styles.title}>{t("my-nfts")}</h2>
              <div className={styles.empty}>
                <img src={nftEmptyImage} alt="" />
                <h3 className={styles.title}>{t("no-nfts-title")}</h3>
                <p className={styles.text}>
                  {t("no-nfts-text")}
                  <span onClick={byNft}>{t("no-nfts-link")}</span>
                </p>
                <button className={styles.button} onClick={byNft}>
                  {t("no-nfts-button")}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <Navigation />
    </div>
  );
};
