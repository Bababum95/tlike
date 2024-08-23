import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { initUtils } from "@telegram-apps/sdk";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

import { Balance, Empty, Navigation, User } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { NFTType } from "@types";
import { changeStatusNFT } from "@/core/store/slices/user";
import { api } from "@/core/api";
import {
  byNftImage,
  cableImprovementsImage,
  engineerImage,
  fanImage,
  waterCoolingImage,
} from "@images";

import styles from "./Mine.module.scss";
import { setNotice } from "@/core/store/slices/notice";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;

export const Mine: FC = () => {
  const utils = initUtils();
  const params = useParams<{ tab?: "mining" | "upgrades" }>();
  const nftList = useAppSelector((state) => state.user.nfts);
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
              {nftList.length ? (
                <ul className={styles.list}>
                  {nftList.map((nft) => (
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
              <div className={styles.upgrade}>
                <motion.img
                  src={fanImage}
                  alt="Fan"
                  className={styles.image}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                  width={83}
                  height={78}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("fan")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>{t("amount")}: 0</p>
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
                  width={83}
                  height={78}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("cable-improvements")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>{t("amount")}: 0</p>
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
                  width={83}
                  height={78}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("water-cooling")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>{t("amount")}: 0</p>
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
                  width={83}
                  height={78}
                />
                <div className={styles.info}>
                  <h2 className={styles.title}>{t("engineer")}</h2>
                  <p className={styles.price}>1 500 TLike</p>
                  <p className={styles.text}>+195 TLove/h</p>
                </div>
                <div className={styles.action}>
                  <button className={styles.button}>{t("buy")}</button>
                  <p className={styles.amount}>{t("amount")}: 0</p>
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

type NFTProps = {
  nft: NFTType;
};

const NFT: FC<NFTProps> = ({ nft }) => {
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
      <p className={styles.speed}>+ 240 Like/h</p>
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
