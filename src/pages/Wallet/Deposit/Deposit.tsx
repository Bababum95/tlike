import { Outlet } from "react-router-dom";

import { Page } from "@/components";

import styles from "./Deposit.module.scss";

export const Deposit = () => {
  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>Пополнить баланс</h1>
        <Outlet />
      </div>
    </Page>
  );
};
