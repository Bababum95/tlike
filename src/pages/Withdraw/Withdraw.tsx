import { useTranslation } from "react-i18next";

import { Input } from "@/components";

import styles from "./Withdraw.module.scss";

export const Withdraw = () => {
  const { t } = useTranslation("wallet");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Like {t("withdraw")}</h1>
      <Input label={t("address")} placeholder={t("address-placeholder")} />
      <Input label={t("total")} placeholder={t("total-placeholder")} />
      <Input label={t("tax")} placeholder="600" readOnly />
      <button className={styles.submit} disabled>{t("withdraw")}</button>
    </div>
  );
};
