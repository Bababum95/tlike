import { useTranslation } from "react-i18next";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { initUtils } from "@telegram-apps/sdk";
import classNames from "classnames";

import { Item, Link, List, Navigation, Toast } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { missionActivate, endMissionLoading } from "@/core/store/slices/user";
import {
  ChevronRightIcon,
  fortuneWheelPreviewImage,
  SuccessIcon,
} from "@images";

import styles from "./Earn.module.scss";

export const Earn = () => {
  const { t } = useTranslation("earn");
  const missions = useAppSelector((state) => state.user.missions);
  const [toast, setToast] = useState<null | number>(null);

  const spinAvailable = () => {
    return !missions.some(
      (mission) => !mission.mission_actived || mission.loading
    );
  };

  return (
    <div className={styles.page}>
      <img
        className={styles.preview}
        src={fortuneWheelPreviewImage}
        alt="Fortune wheel"
      />
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.text}>{t("text")}</p>
      <Link
        to="/earn/fortune"
        className={classNames(styles.spin, {
          [styles.disabled]: !spinAvailable(),
        })}
      >
        {t("spin")}
      </Link>
      {missions && missions.length > 0 && (
        <>
          <h2 className={styles.title}>{t("task-list")}</h2>
          <List>
            {missions.map((mission, index) => (
              <Item
                key={mission.id}
                extraClass={classNames(styles.mission, {
                  [styles.active]: mission.mission_actived && !mission.loading,
                })}
                title={mission.description}
                text={`+ ${mission.award_amount} ${mission.award_currency}`}
                icon={
                  <motion.img
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    src={mission.icon_name}
                    alt={mission.description}
                    width={24}
                    height={24}
                  />
                }
                onClick={
                  mission.mission_actived && !mission.loading
                    ? undefined
                    : () => setToast(index)
                }
              >
                {mission.mission_actived && !mission.loading ? (
                  <SuccessIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </Item>
            ))}
          </List>
        </>
      )}
      <Toast isOpen={toast !== null} onClose={() => setToast(null)}>
        {toast !== null && (
          <EarnToast missionIndex={toast} onClose={() => setToast(null)} />
        )}
      </Toast>
      <Navigation />
    </div>
  );
};

type EarnToastProps = {
  onClose: () => void;
  missionIndex: number;
};

const EarnToast: FC<EarnToastProps> = ({ onClose, missionIndex }) => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.user.missions);
  const utils = initUtils();
  const toast = missions[missionIndex];

  const subscribe = async () => {
    dispatch(missionActivate({ id: toast.id }));
    utils.openLink(toast.redirect_url, { tryInstantView: true });

    setTimeout(() => {
      dispatch(endMissionLoading({ id: toast.id }));
    }, 60000);
  };

  return (
    <div className={styles.toast}>
      <motion.div
        className={styles["toast-icon"]}
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 1] }}
      >
        <img
          src={toast.icon_name}
          alt={toast.description}
          className={styles.icon}
          width={24}
          height={24}
        />
      </motion.div>
      <p className={styles["toast-title"]}>{toast.description}</p>
      <p className={styles["toast-text"]}>
        {toast.award_amount} {toast.award_currency}
      </p>
      <button
        className={classNames(styles["toast-button"], {
          [styles.loading]: toast.loading,
        })}
        onClick={subscribe}
      >
        Subscribe
      </button>
      <button
        className={classNames(styles["toast-button"], {
          [styles.disabled]: !toast.mission_actived || toast.loading,
        })}
        onClick={onClose}
      >
        Check
      </button>
    </div>
  );
};
