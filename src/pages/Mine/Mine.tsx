import { useState } from "react";
import { useTranslation } from "react-i18next";
import { initUtils } from "@telegram-apps/sdk";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

import { Balance, Empty, Navigation, User } from "@/components";
import { byNftImage } from "@images";

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
          exit={{ y: -20, opacity: 0 }}
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
          )}
        </motion.div>
      </AnimatePresence>
      <Navigation />
    </div>
  );
};
