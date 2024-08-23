import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { ErrorIcon, SuccessIcon } from "@images";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./Notice.module.scss";

export const Notice: FC = () => {
  const dispatch = useAppDispatch();
  const noticeStore = useAppSelector((state) => state.notice);

  useEffect(() => {
    if (noticeStore.status === "idle" || noticeStore.status === "loading")
      return;
    const timer = setTimeout(() => {
      dispatch(setNotice({ status: "idle", message: "" }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [noticeStore.status]);

  if (noticeStore.status === "idle" || noticeStore.message === "") return null;

  return (
    <div className={styles.notice}>
      {noticeStore.status === "error" && <ErrorIcon />}
      {noticeStore.status === "success" && <SuccessIcon />}
      {noticeStore.status === "loading" && <span className={styles.spiner} />}
      <span>{noticeStore.message}</span>
    </div>
  );
};
