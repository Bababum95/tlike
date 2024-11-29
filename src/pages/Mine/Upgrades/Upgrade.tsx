import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Upgrade.module.scss";

type Props = {
  id: number;
  value: number;
  count: number;
  costs: number;
  handleBuy: () => void;
};

export const Upgrade: FC<Props> = ({ id, value, count, costs, handleBuy }) => {
  const { t } = useTranslation("mine");
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (count > 0) video.current?.play();
  }, [count, video]);

  return (
    <li className={styles.item}>
      <video
        className={styles.image}
        src={`/animations/upgrades/${id}.webm`}
        autoPlay={count > 0}
        loop
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
        preload="auto"
        width={155}
        height={155}
        poster={count > 0 ? "" : `/images/upgrades/${id}.webp`}
        ref={video}
      >
        <source
          src={`/animations/upgrades/${id}.webm`}
          type="video/webm"
          data-wf-ignore="true"
        />
      </video>
      <div className={styles.info}>
        <h2 className={styles.title}>{t(`upgrade-list.${id}.name`)}</h2>
        <p className={styles.price}>
          {new Intl.NumberFormat("ru-RU", {
            maximumFractionDigits: 0,
          }).format(costs)}{" "}
          Like
        </p>
        <p className={styles.text}>
          +
          {new Intl.NumberFormat("ru-RU", {
            maximumFractionDigits: 0,
          }).format(value)}{" "}
          Love/h
        </p>
        <button className={styles.button} onClick={handleBuy}>
          {t("buy")}
        </button>
        <p className={styles.amount}>
          {t("amount")}: {count}
        </p>
        {count > 0 && (
          <p className={styles.text}>
            +
            {new Intl.NumberFormat("ru-RU", {
              maximumFractionDigits: 0,
            }).format(value * count)}{" "}
            Love/h
          </p>
        )}
      </div>
    </li>
  );
};
