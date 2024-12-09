import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, stagger, useAnimate } from "motion/react";

import { useAppDispatch } from "@hooks";
import { hidePreview } from "@/core/store/slices/stacking";

import { FEATURES } from "./config";
import styles from "./StepOne.module.scss";
import classNames from "classnames";

export const StepOne = () => {
  const { t } = useTranslation("stacking");
  const dispatch = useAppDispatch();
  const [scope, animate] = useAnimate();
  const [showButton, setShowButton] = useState(false);

  const enterAnimation = async () => {
    await animate(
      "li",
      { opacity: [0, 1], y: [100, 0] },
      { delay: stagger(0.15), duration: 0.25, type: "tween" }
    );
    setShowButton(true);
  };

  useEffect(() => {
    enterAnimation();
  }, []);

  const handleContinue = () => {
    dispatch(hidePreview());
  };

  return (
    <div ref={scope}>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.header}
      >
        <h1 className={styles.title}>{t("title")}</h1>
        <h2 className={styles.title}>{t("earn-more")}</h2>
      </motion.header>
      <ul className={styles.features}>
        {FEATURES.map((feature) => (
          <li key={feature} className={styles.feature}>
            <img
              src={`/images/stacking/${feature}.webp`}
              alt="feature icon"
              className={styles.icon}
            />
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: t(`features.${feature}`) }}
            />
          </li>
        ))}
      </ul>
      <button
        className={classNames("primary-button full", {
          [styles.hidden]: !showButton,
        })}
        onClick={handleContinue}
        type="button"
      >
        {t("continue")}
      </button>
    </div>
  );
};
