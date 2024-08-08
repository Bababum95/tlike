import { useTranslation } from "react-i18next";

import { List, Navigation } from "@/components";
import { fortuneWheelPreviewImage } from "@images";

import styles from "./Earn.module.scss";

export const Earn = () => {
  const { t } = useTranslation("earn");

  return (
    <div className={styles.page}>
      <img
        className={styles.preview}
        src={fortuneWheelPreviewImage}
        alt="Fortune wheel"
      />
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.text}>{t("text")}</p>
      <button disabled className={styles.spin}>
        {t("spin")}
      </button>
      <h2 className={styles.title}>{t("task-list")}</h2>
      <List></List>
      <Navigation />
    </div>
  );
};
