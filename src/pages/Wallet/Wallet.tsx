import { useTranslation } from "react-i18next";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

import { Balance, User } from "@/components";

import styles from "./Wallet.module.scss";

export const Wallet = () => {
  const { t } = useTranslation("wallet");
  const wallet = useTonWallet();

  return (
    <div className={styles.page}>
      <User direction="column" />
      <TonConnectButton />
      <div className={styles.buttons}>
        <button className={styles.deposit}>{t("deposit")}</button>
        <button className={styles.button}>{t("withdraw")}</button>
        <button className={styles.button}>{t("transfer")}</button>
      </div>
      <h2 className={styles.title}>Balance</h2>
      <Balance />
    </div>
  );
};
