import { FC } from "react";
import { initData } from "@telegram-apps/sdk-react";
import classNames from "classnames";

import { defaultAvatar } from "@images";
import { useAppDispatch } from "@hooks";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./User.module.scss";

type Props = {
  direction?: "row" | "column";
  size?: "s" | "m" | "l";
  showIcon?: boolean;
};

export const User: FC<Props> = ({
  showIcon,
  direction = "row",
  size = "s",
}) => {
  const user = initData.user();
  const dispatch = useAppDispatch();

  const copy = () => {
    navigator.clipboard.writeText(String(user?.id));
    dispatch(setNotice({ status: "successed", message: "Copied!" }));
  };

  return (
    <div
      className={classNames(styles.container, styles[direction], styles[size])}
    >
      <img
        className={styles.image}
        src={user?.photoUrl || defaultAvatar}
        alt="User"
      />
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
