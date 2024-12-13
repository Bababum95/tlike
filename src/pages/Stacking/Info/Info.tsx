import { useTranslation } from "react-i18next";

import { Navigation, Page } from "@/components";

import styles from "./Info.module.scss";

export const Info = () => {
  const { t } = useTranslation("stacking");

  return (
    <Page>
      <div className={styles.page}>
        <h1 className={styles.title}>{t("title")}</h1>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: t("info") }}
        />
      </div>
      <Navigation />
    </Page>
  );
};
