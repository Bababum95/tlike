import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { useAppSelector } from "@hooks";
import { Navigation, Page } from "@/components";

import { Features } from "./Features";
import styles from "./Stacking.module.scss";

export const Stacking = () => {
  const { t } = useTranslation("stacking");
  const stackingStore = useAppSelector((state) => state.stacking);

  return (
    <Page back={false}>
      <AnimatePresence>
        <div
          className={classNames(styles.page, {
            [styles.preview]: stackingStore.preview,
          })}
        >
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className={styles.title}>{t("title")}</h1>
            <h2 className={styles.title}>{t("earn-more")}</h2>
          </motion.header>
          {stackingStore.preview && <Features />}
        </div>
      </AnimatePresence>
      <Navigation />
    </Page>
  );
};
