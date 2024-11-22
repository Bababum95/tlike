import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TonConnectButton } from "@tonconnect/ui-react";

import { Link, Toast, User } from "@/components";
import { HistoryIcon } from "@images";
import { useAppSelector } from "@hooks";

import styles from "./Wallet.module.scss";

export const Wallet = () => {
  // const [toastIsOpen, setToastIsOpen] = useState(false);a
  const { t } = useTranslation("wallet");
  const user = useAppSelector((state) => state.user);
  const depositRef = useRef<HTMLDivElement>(null);

  return (
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

      {Object.entries(user.balances).map(([key, value]) => (
        <div className={styles.item} key={key}>
          <img src={`/images/currency/${key}.png`} alt={key} />
          <p className={styles.key}>{key}</p>
          <p className={styles.value}>{value}</p>
        </div>
      ))}

      {/* <Toast isOpen={toastIsOpen} onClose={() => setToastIsOpen(false)}>
        <></>
      </Toast> */}
    </div>
  );
};
