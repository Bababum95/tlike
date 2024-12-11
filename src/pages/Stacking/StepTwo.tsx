import { FC } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import type { StackingSettings, OpenStacking } from "@types";
import { ChevronRightIcon } from "@images";
import { Item, List } from "@/components";

import styles from "./StepTwo.module.scss";

type Props = {
  settings: StackingSettings[];
  openStackings: OpenStacking[];
};

export const StepTwo: FC<Props> = ({ settings, openStackings }) => {
  const { t } = useTranslation("stacking");

  return (
    <div>
      <motion.header
        animate={{ x: [50, -15, 0] }}
        transition={{ duration: 0.3 }}
        className={styles.header}
      >
        <h1 className={styles.title}>{t("title")}</h1>
      </motion.header>
      <List>
        {settings.map((setting, index) => {
          const token = setting.currency.toLowerCase();
          const rate = setting.rates.find(
            (rate) => rate.currency === setting.currency
          );
          const text =
            (token === "love" || token === "like") && rate?.min
              ? t("from-per-year", { amount: `${rate.min}-${rate.max}` })
              : t("get-like-love");

          return (
            <Item
              key={index}
              title={`${t("title")} ${setting.currency}`}
              text={text}
              link={`/stacking/${token}`}
              icon={
                <img
                  src={`/images/tokens/${token}.webp`}
                  width={37}
                  height={40}
                />
              }
            >
              <ChevronRightIcon />
            </Item>
          );
        })}
      </List>
      {openStackings.length > 0 && (
        <motion.section
          className={styles.section}
          animate={{ x: [50, -15, 0] }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={styles.title}>Open stackings</h2>
          <ul className={styles.list}>
            {openStackings.map((stacking) => (
              <li key={stacking.session_id} className={styles.item}>
                <div className={styles.header}>
                  <img
                    src={`/images/tokens/${stacking.currency.toLowerCase()}.webp`}
                    width={26}
                    height={28}
                    className={styles.icon}
                  />
                  <p className={styles.title}>{t("title")}</p>
                  <p className={styles.amount}>
                    {stacking.staked_amount} {stacking.currency}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  );
};
