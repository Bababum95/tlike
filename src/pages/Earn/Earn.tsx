import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import { Navigation, Page, TabBar } from "@/components";

import styles from "./Earn.module.scss";

export const Earn = () => {
  const { t } = useTranslation("earn");

  return (
    <Page back={false}>
      <div className={styles.page}>
        <TabBar
          type="link"
          links={[
            { label: t("calendar"), path: "/earn/calendar" },
            { label: t("tasks"), path: "/earn" },
            { label: t("fortune"), path: "/earn/fortune" },
          ]}
        />
        <Outlet />
      </div>
      <Navigation />
    </Page>
  );
};
