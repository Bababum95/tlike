import { useTranslation } from "react-i18next";

import { Input } from "@/components";

import styles from "./Transfer.module.scss";

export const Transfer = () => {
  const { t } = useTranslation("wallet");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Love {t("transfer")}</h1>
      <Input label="ID" placeholder={t("id-placeholder")} />
      <Input
        label={t("total")}
        placeholder={t("total-love-placeholder")}
        hint={t("total-love-hint")}
      />
      <button className={styles.submit} disabled>
        {t("send")}
      </button>
    </div>
  );
};
