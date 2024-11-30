import { FC, useState } from "react";
import { motion } from "motion/react";
import { initData } from "@telegram-apps/sdk-react";
import classNames from "classnames";

import type { CardType } from "@types";
import { TabBar } from "@/components";

import styles from "./Card.module.scss";

type Props = {
  type?: CardType;
};

export const Card: FC<Props> = () => {
  const user = initData.user();
  const [type, setType] = useState<CardType>("silver");

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      key="card"
    >
      <h2 className={styles.title}>Карта</h2>
      <TabBar
        type="button"
        active={type}
        onClick={(id) => setType(id as CardType)}
        links={[
          { label: "Silver", id: "silver" },
          { label: "Gold", id: "gold" },
          { label: "Platinum", id: "platinum" },
        ]}
      />
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
              <p className={styles.value}>{user?.id}</p>
              <p className={styles.label}>TELEGRAM NICKNAME:</p>
              <p className={styles.value}>{user?.username}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.title}>
            {type === "silver" ? "Параметры карты" : "Преимущества карты"}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};
