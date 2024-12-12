import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import type {
  StackingSettings,
  OpenStacking as OpenStackingType,
} from "@types";
import { useAppDispatch } from "@hooks";
import { ChevronRightIcon, SuccessIcon } from "@images";
import { Item, List, Toast } from "@/components";
import { claimStacking } from "@/core/store/thunks";

import { OpenStacking } from "./OpenStacking";
import styles from "./StepTwo.module.scss";

type Props = {
  settings: StackingSettings[];
  openStackings: OpenStackingType[];
};

export const StepTwo: FC<Props> = ({ settings, openStackings }) => {
  const [claimToast, setClaimToast] = useState<boolean>(false);
  const { t } = useTranslation("stacking");
  const dispatch = useAppDispatch();

  const closeToast = () => {
    setClaimToast(false);
  };

  const handleClaim = async (id: number) => {
    const result = await dispatch(claimStacking(id));
    if (result.meta.requestStatus === "fulfilled") {
      setClaimToast(true);
    }
  };

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
            {openStackings.map((stacking, index) => (
              <OpenStacking
                key={stacking.session_id}
                delay={index * 0.1}
                onClaim={handleClaim}
                {...stacking}
              />
            ))}
          </ul>
        </motion.section>
      )}
      <Toast isOpen={claimToast} onClose={closeToast}>
        <div className={styles.toast}>
          <SuccessIcon />
          <p>Ваш баланс пополнен!</p>
          <button
            className="primary-button full"
            onClick={closeToast}
            type="button"
          >
            Продолжить
          </button>
        </div>
      </Toast>
    </div>
  );
};
