import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TonConnectButton } from "@tonconnect/ui-react";
import { motion, AnimatePresence, stagger, useAnimate } from "motion/react";
import { Outlet } from "react-router-dom";

import { Link, User, Page, BalanceItem, TabBar } from "@/components";
import { HistoryIcon } from "@images";
import { TOKENS } from "@/core/config";

import styles from "./Wallet.module.scss";

export const Wallet = () => {
  const { t } = useTranslation("wallet");
  const [scope, animate] = useAnimate();
  const depositRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animate(
      "li",
      { opacity: [0, 1], x: [100, 0] },
      { delay: stagger(0.15), duration: 0.25, type: "tween" }
    );
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        key="wallet"
        className={styles.page}
      >
        <Page>
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
          <ul className={styles.list} ref={scope}>
            {TOKENS.map(({ key }) => (
              <BalanceItem name={key} key={key} Element="li" />
            ))}
          </ul>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            key="card"
            className={styles.card}
          >
            <h2 className={styles.title}>Карта</h2>
            <TabBar
              links={[
                { label: "Silver", path: "/wallet" },
                { label: "Gold", path: "/wallet/gold" },
                { label: "Platinum", path: "/wallet/platinum" },
              ]}
            />
            <div>
              <Outlet />
            </div>
          </motion.div>
        </Page>
      </motion.div>
    </AnimatePresence>
  );
};
