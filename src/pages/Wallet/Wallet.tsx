import { useTranslation } from "react-i18next";
import { TonConnectButton } from "@tonconnect/ui-react";

import { Balance, Link, User } from "@/components";
import { HistoryIcon } from "@images";

import styles from "./Wallet.module.scss";

export const Wallet = () => {
  const { t } = useTranslation("wallet");

  return (
    <div className={styles.page}>
      <Link to="/history" className={styles.history}>
        <HistoryIcon />
      </Link>
      <User direction="column" />
      <TonConnectButton className={styles.wallet} />
      <div className={styles.buttons}>
        <button className={styles.deposit}>{t("deposit")}</button>
        <button className={styles.button}>{t("withdraw")}</button>
        <button className={styles.button}>{t("transfer")}</button>
      </div>
      <h2 className={styles.title}>Balance</h2>
      <Balance />
      <div className={styles["deposit-wrapper"]}>
        <h3 className={styles["deposit-title"]}>{t("deposit")}</h3>
        <p className={styles["deposit-hint"]}>{t("deposit-hint")}</p>
        <Link to="/wallet/deposit" className={styles["deposit-contact"]}>
          {t("contact-support")}
        </Link>
      </div>
    </div>
  );
};
