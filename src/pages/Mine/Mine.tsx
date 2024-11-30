import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Navigation, TabBar, User, Page } from "@/components";

import styles from "./Mine.module.scss";

export const Mine: FC = () => {
  const { t } = useTranslation("mine");

  return (
    <Page back={false}>
      <div className={styles.container}>
        <header className={styles.header}>
          <User />
          <div className={styles.tabs}>
            <TabBar
              type="link"
              links={[
                { label: t("mining"), path: "/mine" },
                { label: t("upgrades"), path: "/mine/upgrades" },
              ]}
            />
          </div>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
        <Navigation />
      </div>
    </Page>
  );
};
