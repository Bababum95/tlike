import { FC } from "react";
import { initInitData } from "@telegram-apps/sdk";
import classNames from "classnames";

import { defaultAvatar } from "@images";

import styles from "./User.module.scss";

type Props = {
  direction?: "row" | "column";
};

export const User: FC<Props> = ({ direction = "row" }) => {
  const initData = initInitData();
  console.log(initData);
  return (
    <div className={classNames(styles.container, styles[direction])}>
      <img className={styles.image} src={defaultAvatar} />
      <div className={styles.info}>
        <p className={styles.name}>@{initData?.user?.username || "unknown"}</p>
        <p className={styles.id}>ID: {initData?.user?.id}</p>
      </div>
    </div>
  );
};
