import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { openLink } from "@telegram-apps/sdk-react";
import classNames from "classnames";

import { Balance, Empty } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { NFTType } from "@types";
import { byNftImage } from "@images";
import { api } from "@/core/api";
import { changeStatusNFT } from "@/core/store/slices/user";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./Index.module.scss";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;

export const Index = () => {
  const { t } = useTranslation("mine");
  const user = useAppSelector((state) => state.user);

  const byNft = () => {
    openLink(getgemsUrl);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Balance />
        <img
          src={byNftImage}
          alt="By NFT"
          className={styles["by-nft"]}
          onClick={byNft}
        />
        <div className={styles["title-container"]}>
          <h2 className={styles.title}>{t("my-nfts")}</h2>
          {!!user.nfts.length && (
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
      </motion.div>
    </AnimatePresence>
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
