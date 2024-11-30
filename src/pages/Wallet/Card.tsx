import { FC } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

import styles from "./Card.module.scss";

type Props = {
  type?: "silver" | "gold" | "platinum";
};

export const Card: FC<Props> = ({ type = "silver" }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      key={"card-" + type}
      className={styles.wrapper}
    >
      <div className={classNames(styles.card, styles[type])}>
        <video
          src={`/animations/card/${type}.webm`}
          autoPlay={true}
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          preload="auto"
        >
          <source
            src={`/animations/card/${type}.webm`}
            type="video/webm"
            data-wf-ignore="true"
          />
        </video>
        <div className={styles.info}>
          <p className={styles.value}>{type} card</p>
          <div className={styles.user}>
            <p className={styles.label}>TELEGRAM ID:</p>
            <p className={styles.value}>123456789</p>
            <p className={styles.label}>TELEGRAM NICKNAME:</p>
            <p className={styles.value}>123456789</p>
          </div>
        </div>
        <div>
          <h3 className={styles.title}>
            {type === "silver" ? "Параметры карты" : "Преимущества карты"}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};
