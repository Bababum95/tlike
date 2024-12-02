import { FC, useState } from "react";
import { motion } from "motion/react";
import { initData } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import type { CardType } from "@types";
import { TabBar } from "@/components";
import { SuccessIcon, ErrorIcon } from "@images";
import { useAppSelector } from "@hooks";
import { CARD_ADVANTAGES } from "@config";

import styles from "./Card.module.scss";

type ItemProps = {
  delay: number;
  title: string;
  description?: string;
  success?: boolean;
};

const Item: FC<ItemProps> = ({ delay, title, description, success }) => {
  return (
    <motion.li
      className={styles.item}
      animate={{
        x: [100, 0],
        opacity: [0, 1],
      }}
      transition={{
        delay,
        duration: 0.2,
      }}
    >
      {success ? <SuccessIcon /> : <ErrorIcon />}
      <div>
        <p className={styles["item-title"]}>{title}</p>
        {description && (
          <p className={styles["item-description"]}>{description}</p>
        )}
      </div>
    </motion.li>
  );
};

export const Card = () => {
  const { t } = useTranslation("card");
  const user = initData.user();
  const card = useAppSelector((state) => state.card);

  const [type, setType] = useState<CardType>(card.current);
  const advantages = card.advantages[type];
  const requirements = card.requirements[type];

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
            src={`/animations/cards/${type}.webm`}
            poster={`/images/cards/${type}.webp`}
            autoPlay={true}
            loop
            muted
            playsInline
            data-wf-ignore="true"
            data-object-fit="cover"
            preload="auto"
          >
            <source
              src={`/animations/cards/${type}.webm`}
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
                <Item
                  key={item + type}
                  delay={0.1 * index}
                  title={t(`advantages.${item}.title`)}
                  description={t(`advantages.${item}.description`, {
                    amount: new Intl.NumberFormat("ru-RU").format(
                      advantages[item]
                    ),
                    count: advantages[item],
                  })}
                  success
                />
              ))}
              {type === "platinum" && (
                <Item
                  delay={0.1 * CARD_ADVANTAGES.length}
                  title="Особые привелегии в Telegram"
                  success
                />
              )}
            </ul>
          </div>
        )}
        {requirements && (
          <div className={styles.section}>
            <h3 className={styles.title}>Условия активации</h3>
            <ul className={styles.list}>
              {advantages.nft_requirement && (
                <Item
                  delay={0}
                  title={t(`requirements.nft.title`, {
                    amount: advantages.nft_requirement,
                  })}
                  description={t(`requirements.nft.description`)}
                  success={requirements.nft_count_is_completed}
                />
              )}
              {advantages.stacking_requirement && (
                <Item
                  delay={0.1}
                  title={t(`requirements.stacking.title`)}
                  description={t(`requirements.stacking.description`, {
                    amount: advantages.stacking_requirement,
                  })}
                  success={requirements.stacked_usdt_is_completed}
                />
              )}
              {type === "platinum" && (
                <Item
                  delay={0.2}
                  title={t(`requirements.platinum.title`)}
                  description={t(`requirements.nft.description`)}
                  success={requirements.platinum_nft}
                />
              )}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
