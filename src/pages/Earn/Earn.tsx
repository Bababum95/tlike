import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import { Item, Link, List, Navigation, Toast } from "@/components";
import { useAppSelector } from "@hooks";
import { MissionType } from "@types";
import {
  ChevronRightIcon,
  fortuneWheelPreviewImage,
  SuccessIcon,
} from "@images";

import styles from "./Earn.module.scss";

export const Earn = () => {
  const { t } = useTranslation("earn");
  const missions = useAppSelector((state) => state.user.missions);
  const [toast, setToast] = useState<null | MissionType>(null);

  const openToast = (mission: MissionType) => {
    setToast(mission);
  };

  const spinAvailable = () => {
    if (!missions || missions.length < 1) return true;
    return missions.some((mission) => !mission.mission_actived);
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
        className={classNames(styles.spin, { [styles.disabled]: spinAvailable })}
      >
        {t("spin")}
      </Link>
      {missions && missions.length > 0 && (
        <>
          <h2 className={styles.title}>{t("task-list")}</h2>
          <List>
            {missions.map((mission) => (
              <Item
                key={mission.id}
                extraClass={classNames(styles.mission, {
                  [styles.active]: mission.mission_actived,
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
                  mission.mission_actived ? undefined : () => openToast(mission)
                }
              >
                {mission.mission_actived ? (
                  <SuccessIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </Item>
            ))}
          </List>
        </>
      )}
      <Toast isOpen={!!toast} onClose={() => setToast(null)}>
        <>
          {toast && (
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
              <Link to={toast.redirect_url} className={styles["toast-button"]}>
                Subscribe
              </Link>
              <button className={styles["toast-button"]}>Check</button>
            </div>
          )}
        </>
      </Toast>
      <Navigation />
    </div>
  );
};
