import { FC } from "react";

import { useAppSelector } from "@hooks";

import styles from "./Notice.module.scss";
import { ErrorIcon } from "@images";

export const Notice: FC = () => {
  const noticeStore = useAppSelector((state) => state.notice);

  if (noticeStore.status === "idle" || noticeStore.message === "") return null;

  return (
    <div className={styles.notice}>
      {noticeStore.status === "error" && <ErrorIcon />}
      <span>{noticeStore.message}</span>
    </div>
  );
};
