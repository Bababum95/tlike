import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TonConnectButton } from "@tonconnect/ui-react";

import { Balance, Link, Toast, User } from "@/components";
import { HistoryIcon, LikeIcon, LoveIcon } from "@images";

import styles from "./Wallet.module.scss";

export const Wallet = () => {
  const { t } = useTranslation("wallet");
  const [toastIsOpen, setToastIsOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Link to="/wallet/history" className={styles.history}>
        <HistoryIcon />
      </Link>
      <User direction="column" />
      <TonConnectButton className={styles.wallet} />
      <div className={styles.buttons}>
        <button className={styles.deposit}>{t("deposit")}</button>
        <button className={styles.button} onClick={() => setToastIsOpen(true)}>
          {t("withdraw")}
        </button>
        <Link to="/wallet/transfer" className={styles.button}>
          {t("transfer")}
        </Link>
      </div>
      <h2 className={styles.title}>{t("balance")}</h2>
      <Balance />
      <div className={styles["deposit-wrapper"]}>
        <h3 className={styles["deposit-title"]}>{t("deposit")}</h3>
        <p className={styles["deposit-hint"]}>{t("deposit-hint")}</p>
        <Link
          to="https://t.me/Likeminingsupport"
          className={styles["deposit-contact"]}
        >
          {t("contact-support")}
        </Link>
      </div>
      <Toast isOpen={toastIsOpen} onClose={() => setToastIsOpen(false)}>
        <h2 className={styles["toast-title"]}>{t("withdraw-settings")}</h2>
        <Link to="/wallet/withdraw" className={styles["withdraw-item"]}>
          <LikeIcon />
          <div>
            <h3>$LIKE {t("withdraw")}</h3>
            <p>{t("withdraw-like-hint")}</p>
          </div>
        </Link>
        <div className={styles["withdraw-item"]}>
          <LoveIcon />
          <div>
            <h3>{t("coming-soon")}</h3>
            <p>{t("withdraw-love-hint")}</p>
          </div>
        </div>
      </Toast>
    </div>
  );
};
