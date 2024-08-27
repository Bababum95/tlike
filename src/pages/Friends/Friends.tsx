import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { initUtils, initInitData } from "@telegram-apps/sdk-react";

import { Empty, Item, List, Navigation } from "@/components";
import {
  TelegramPremiumIcon,
  TelegramLogoIcon,
  CopyIcon,
  FriendIcon,
} from "@images";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./Friends.module.scss";

const tgUrl = import.meta.env.VITE_WEB_APP_URL;

export const Friends = () => {
  const { t } = useTranslation("friends");
  const utils = initUtils();
  const initData = initInitData();
  const shareURL = `${tgUrl}?startapp=${initData?.user?.id}`;
  const dispatch = useAppDispatch();
  const referrals = useAppSelector((state) => state.user.referrals);

  const copy = () => {
    navigator.clipboard.writeText(shareURL);
    dispatch(setNotice({ status: "success", message: "Copied!" }));
  };

  const Invite = () => (
    <div className={styles.invite}>
      <button
        className={styles["invite-button"]}
        onClick={() => utils.shareURL(shareURL)}
      >
        {t("invite-friend")}
      </button>
      <button className={styles.copy} onClick={copy}>
        <CopyIcon />
      </button>
    </div>
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.hint}>{t("hint")}</p>
      <List>
        <Item
          icon={<TelegramLogoIcon />}
          text={`+ 5 000 LOVE ${t("for-you-and-your-friend")}`}
          title={t("invite-friend")}
        />
        <Item
          icon={<TelegramPremiumIcon />}
          text={`+ 25 000 LOVE ${t("for-you-and-your-friend")}`}
          title={`${t("invite-friend")} ${t("with-telegram-premium")}`}
        />
      </List>
      <h2 className={styles.title}>{t("invited-friends")}</h2>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          layout
          key="main"
        >
          {referrals.length > 0 ? (
            <List>
              {referrals.map((referral) => (
                <Item
                  key={referral.stats_user_id}
                  icon={
                    <img
                      className={styles.photo}
                      src={referral.max_stats_photo_url}
                    />
                  }
                  title={referral.stats_user_id}
                  text={`+ ${new Intl.NumberFormat("ru-RU", {
                    maximumFractionDigits: 0,
                  }).format(referral.sum_amount)} LOVE`}
                >
                  <span className={styles.counter}>
                    {referral.sum_level_2} <FriendIcon />
                  </span>
                </Item>
              ))}
            </List>
          ) : (
            <Empty title={t("empty-title")}>
              <p>{t("empty-text")}</p>
              <Invite />
            </Empty>
          )}
        </motion.div>
      </AnimatePresence>
      <Navigation />
    </div>
  );
};
