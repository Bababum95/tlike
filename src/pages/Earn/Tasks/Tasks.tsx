import { useTranslation } from "react-i18next";
import { FC, useState, useEffect } from "react";
import { motion } from "motion/react";
import { openLink } from "@telegram-apps/sdk-react";
import classNames from "classnames";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

import { Item, List, Toast } from "@/components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { startTask, checkTask } from "@/core/store/thunks";
import { ChevronRightIcon, SuccessIcon } from "@images";

import styles from "./Tasks.module.scss";

export const Tasks = () => {
  const { t } = useTranslation("earn");
  const { initial } = useAppSelector((state) => state.task);
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
      {initial && initial.length > 0 && (
        <>
          <h2 className={styles.title}>{t("task-list")}</h2>
          <List>
            {initial.map((mission, index) => (
              <Item
                key={mission.id}
                extraClass={classNames(styles.mission, {
                  [styles.active]:
                    mission.mission_actived && mission.status === "successed",
                })}
                title={mission.description}
                text={`+ ${mission.award_amount} ${mission.award_currency}`}
                icon={
                  <span className={styles.icon}>
                    <img
                      src={mission.icon_name}
                      alt={mission.description}
                      width={24}
                      height={24}
                    />
                  </span>
                }
                onClick={() => setToast(index)}
              >
                {mission.mission_actived && mission.status === "successed" ? (
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
  const { initial } = useAppSelector((state) => state.task);
  const toast = initial[missionIndex];

  const subscribe = async () => {
    if (!toast.mission_actived) {
      dispatch(startTask({ id: toast.id, type: "initial" }));
      openLink(toast.redirect_url, { tryInstantView: true });
    } else {
      openLink(toast.redirect_url, { tryInstantView: true });
    }
  };

  const check = async () => {
    const response = await dispatch(
      checkTask({ id: toast.id, type: "initial" })
    ).unwrap();
    console.log(response, response.type);
    if (response.type === "fulfilled") {
      onMissionComplete();
      onClose();
    }
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
          width={55}
          height={55}
        />
      </motion.div>
      <p className="toast-title">{toast.description}</p>
      <p className="toast-value">
        + {toast.award_amount} {toast.award_currency}
      </p>
      <button
        onClick={subscribe}
        className={classNames("primary-button full", {
          loading: toast.status === "loading",
        })}
      >
        Subscribe
      </button>
      <button
        className={classNames("primary-button full", {
          disabled: toast.status !== "can-check",
          loading: toast.status === "checking",
        })}
        onClick={check}
      >
        Check
      </button>
    </div>
  );
};
