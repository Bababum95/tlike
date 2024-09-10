import { FC } from "react";
import { initInitData } from "@telegram-apps/sdk";
import classNames from "classnames";

import { defaultAvatar } from "@images";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./User.module.scss";

type Props = {
  direction?: "row" | "column";
  showIcon?: boolean;
};

export const User: FC<Props> = ({ direction = "row", showIcon }) => {
  const photo = useAppSelector((state) => state.user.photo);
  const initData = initInitData();
  const dispatch = useAppDispatch();

  const copy = () => {
    if (!initData || !initData.user) return;

    navigator.clipboard.writeText(String(initData.user.id));
    dispatch(setNotice({ status: "success", message: "Copied!" }));
  };

  return (
    <div className={classNames(styles.container, styles[direction])}>
      <img className={styles.image} src={photo || defaultAvatar} alt="User" />
      <div className={styles.info}>
        <p className={styles.name}>@{initData?.user?.username || "unknown"}</p>
        <p
          className={classNames(styles.id, { [styles["with-icon"]]: showIcon })}
          onClick={copy}
        >
          ID: {initData?.user?.id}
        </p>
      </div>
    </div>
  );
};
