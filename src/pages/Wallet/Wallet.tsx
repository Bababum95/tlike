import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TonConnectButton } from "@tonconnect/ui-react";

import { Link, User, Page, BalanceItem } from "@/components";
import { HistoryIcon } from "@images";
import { TOKENS } from "@/core/config";

import styles from "./Wallet.module.scss";

export const Wallet = () => {
  const { t } = useTranslation("wallet");
  const depositRef = useRef<HTMLDivElement>(null);

  return (
    <Page>
      <div className={styles.page}>
        <header className={styles.header}>
          <User size="m" showIcon />
          <Link to="/wallet/history" className={styles.history}>
            <HistoryIcon />
          </Link>
        </header>
        <TonConnectButton className={styles.wallet} />
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              depositRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("deposit")}
          </button>
          <button className={styles.button}>{t("withdraw")}</button>
          <Link to="/wallet/transfer" className={styles.button}>
            {t("transfer")}
          </Link>
          <Link to="/wallet/transfer" className={styles.button}>
            {t("transfer")}
          </Link>
        </div>
        <h2 className={styles.title}>{t("balance")}</h2>

        <ul className={styles.list}>
          {TOKENS.map(({ key }) => (
            <BalanceItem name={key} key={key} />
          ))}
        </ul>
      </div>
    </Page>
  );
};
