import { FC } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import type { StackingSettings } from "@types";
import { ChevronRightIcon } from "@images";
import { Item, List } from "@/components";

import styles from "./StepTwo.module.scss";

type Props = {
  settings: StackingSettings[];
};

export const StepTwo: FC<Props> = ({ settings }) => {
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
    </div>
  );
};
