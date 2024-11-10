import { FC } from "react";
import { initData } from "@telegram-apps/sdk-react";
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
  const user = initData.user();
  const dispatch = useAppDispatch();

  const copy = () => {
    navigator.clipboard.writeText(String(user?.id));
    dispatch(setNotice({ status: "success", message: "Copied!" }));
  };

  return (
    <div className={classNames(styles.container, styles[direction])}>
      <img className={styles.image} src={photo || defaultAvatar} alt="User" />
      <div className={styles.info}>
        <p className={styles.name}>@{user?.username || "unknown"}</p>
        <p
          className={classNames(styles.id, { [styles["with-icon"]]: showIcon })}
          onClick={copy}
        >
          ID: {user?.id}
        </p>
      </div>
    </div>
  );
};
