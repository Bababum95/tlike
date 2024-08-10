import { useTranslation } from "react-i18next";

import styles from "./Fortune.module.scss";

export const Fortune = () => {
  const { t } = useTranslation("earn");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>
    </div>
  );
};
