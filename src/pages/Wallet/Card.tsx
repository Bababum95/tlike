import { FC, useState } from "react";
import { motion } from "motion/react";
import { initData } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import type { CardType } from "@types";
import { TabBar } from "@/components";
import { SuccessIcon } from "@images";
import { useAppSelector } from "@hooks";
import { CARD_ADVANTAGES } from "@config";

import styles from "./Card.module.scss";

type Props = {
  type?: CardType;
};

export const Card: FC<Props> = () => {
  const { t } = useTranslation("card");
  const user = initData.user();
  const card = useAppSelector((state) => state.card);

  const [type, setType] = useState<CardType>(card.current);
  const advantages = card.advantages[type];

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      key="card"
    >
      <h2 className={styles.title}>{t("title")}</h2>
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
        {advantages && (
          <div className={styles.section}>
            <h3 className={styles.title}>
              {type === "silver" ? "Параметры карты" : "Преимущества карты"}
            </h3>
            <ul className={styles.list}>
              {CARD_ADVANTAGES.map((item, index) => (
                <motion.li
                  key={item + type}
                  className={styles.item}
                  animate={{
                    x: [100, 0],
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 * index,
                  }}
                >
                  <SuccessIcon />
                  <div>
                    <p className={styles["advantage-title"]}>
                      {t(`advantages.${item}.title`)}
                    </p>
                    <p className={styles["advantage-description"]}>
                      {t(`advantages.${item}.description`, {
                        amount: new Intl.NumberFormat("ru-RU").format(
                          advantages[item]
                        ),
                        count: advantages[item],
                      })}
                    </p>
                  </div>
                </motion.li>
              ))}
              {type === "platinum" && (
                <motion.li
                  className={styles.item}
                  animate={{
                    x: [100, 0],
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 * CARD_ADVANTAGES.length,
                  }}
                >
                  <SuccessIcon />
                  <div>
                    <p className={styles["advantage-title"]}>
                      Особые привелегии в Telegram
                    </p>
                  </div>
                </motion.li>
              )}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
