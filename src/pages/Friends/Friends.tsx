import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import { Empty, Navigation } from "@/components";
import { TelegramPremiumIcon, TelegramLogoIcon, CopyIcon } from "@images";

import styles from "./Friends.module.scss";

export const Friends = () => {
  const { t } = useTranslation("friends");

  const Invite = () => (
    <div className={styles.invite}>
      <button className={styles["invite-button"]}>{t("invite-friend")}</button>
      <button className={styles.copy}>
        <CopyIcon />
      </button>
    </div>
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.hint}>{t("hint")}</p>
      <AnimatePresence mode="wait">
        <motion.ul
          className={styles.list}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.2 }}
          layout
          key="list"
        >
          <li className={styles.item}>
            <TelegramLogoIcon />
            <div>
              <p className={styles["item-title"]}>{t("invite-friend")}</p>
              <p className={styles["item-text"]}>
                + 5 000 LOVE {t("for-you-and-your-friend")}
              </p>
            </div>
          </li>
          <li className={styles.item}>
            <TelegramPremiumIcon />
            <div>
              <p className={styles["item-title"]}>
                {t("invite-friend")} {t("with-telegram-premium")}
              </p>
              <p className={styles["item-text"]}>
                + 25 000 LOVE {t("for-you-and-your-friend")}
              </p>
            </div>
          </li>
        </motion.ul>
      </AnimatePresence>
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
          <Empty title={t("empty-title")}>
            <p>{t("empty-text")}</p>
            <Invite />
          </Empty>
        </motion.div>
      </AnimatePresence>
      <Navigation />
    </div>
  );
};
