import { Outlet } from "react-router-dom";

import { Page } from "@/components";

import styles from "./Deposit.module.scss";

/**
 * Deposit component for handling the deposit balance page.
 * This component serves as a wrapper for the deposit functionality,
 * providing a title and rendering the appropriate child routes.
 *
 * @returns {JSX.Element} The rendered Deposit component.
 */
export const Deposit = (): JSX.Element => {
  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>Пополнить баланс</h1>
        <Outlet />
      </div>
    </Page>
  );
};
