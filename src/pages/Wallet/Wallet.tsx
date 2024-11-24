import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TonConnectButton } from "@tonconnect/ui-react";

import { Link, User, Page } from "@/components";
import { HistoryIcon } from "@images";
import { useAppSelector } from "@hooks";

import styles from "./Wallet.module.scss";
import { BALANCES } from "@/core/config";

export const Wallet = () => {
  const { t } = useTranslation("wallet");
  const user = useAppSelector((state) => state.user);
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
          {BALANCES.map(({ key, icon, name }) => (
            <li className={styles.item} key={key}>
              <img className={styles.icon} src={icon} alt={name} />
              <p className={styles.name}>{name}</p>
              <p className={styles.value}>{user.balances[key]}</p>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};
