import { useTranslation } from "react-i18next";

import { Empty } from "@/components";

import styles from "./History.module.scss";

export const History = () => {
  const { t } = useTranslation("wallet");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("transaction-history")}</h1>
      <Empty title={t("history-empty-title")} extraClass={styles.empty}>
        <p>{t("history-empty-text")}</p>
      </Empty>
    </div>
  );
};
