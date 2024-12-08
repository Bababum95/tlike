import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, stagger, useAnimate } from "motion/react";

import { FEATURES } from "./config";
import styles from "./Stacking.module.scss";

export const Features = () => {
  const { t } = useTranslation("stacking");
  const [scope, animate] = useAnimate();

  const enterAnimation = async () => {
    await animate(
      "li",
      { opacity: [0, 1], y: [100, 0] },
      { delay: stagger(0.15), duration: 0.25, type: "tween" }
    );
    await animate(
      "button",
      { opacity: [0, 1] },
      { duration: 0.25, type: "tween" }
    );
  };

  useEffect(() => {
    enterAnimation();
  }, []);

  return (
    <div ref={scope}>
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
      <motion.button initial={{ opacity: 0 }} className="primary-button full">
        Продолжить
      </motion.button>
    </div>
  );
};
