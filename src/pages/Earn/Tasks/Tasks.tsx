import { useTranslation } from "react-i18next";
import { FC, useState, useEffect } from "react";
import { motion } from "motion/react";
import { openLink } from "@telegram-apps/sdk-react";
import classNames from "classnames";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

import { Item, List, Toast } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { missionActivate, endMissionLoading } from "@/core/store/slices/user";
import { ChevronRightIcon, SuccessIcon } from "@images";

import styles from "./Tasks.module.scss";

export const Tasks = () => {
  const { t } = useTranslation("earn");
  const missions = useAppSelector((state) => state.user.missions);
  const [toast, setToast] = useState<null | number>(null);
  const [showFirework, setShowFirework] = useState(false);

  useEffect(() => {
    if (showFirework) {
      const timer = setTimeout(() => setShowFirework(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showFirework]);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{t("story.title")}</h2>
      <div className={styles.story}>
        <p className={styles["story-text"]}>{t("story.text")}</p>
        <button className="primary-button full">{t("story.button")}</button>
      </div>
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
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    src={mission.icon_name}
                    alt={mission.description}
                    width={24}
                    height={24}
                  />
                }
                onClick={() => setToast(index)}
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
          <EarnToast
            missionIndex={toast}
            onClose={() => setToast(null)}
            onMissionComplete={() => setShowFirework(true)}
          />
        )}
      </Toast>
      {showFirework && (
        <Realistic onInit={({ conductor }) => conductor.shoot()} />
      )}
    </main>
  );
};

type EarnToastProps = {
  onClose: () => void;
  missionIndex: number;
  onMissionComplete: () => void;
};

const EarnToast: FC<EarnToastProps> = ({
  onClose,
  missionIndex,
  onMissionComplete,
}) => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.user.missions);
  const toast = missions[missionIndex];

  const subscribe = async () => {
    if (!toast.mission_actived) {
      dispatch(missionActivate({ id: toast.id }));
      openLink(toast.redirect_url, { tryInstantView: true });

      setTimeout(() => {
        dispatch(endMissionLoading({ id: toast.id }));
        onMissionComplete();
      }, 10000);
    } else {
      openLink(toast.redirect_url, { tryInstantView: true });
    }
  };

  return (
    <div className={styles.toast}>
      <motion.div
        className={"toast-icon"}
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
      <p className={"toast-title"}>{toast.description}</p>
      <p className={"toast-value"}>
        + {toast.award_amount} {toast.award_currency}
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
          [styles.disabled]: toast.mission_actived || toast.loading,
        })}
        onClick={onClose}
        disabled={toast.mission_actived}
      >
        Check
      </button>
    </div>
  );
};