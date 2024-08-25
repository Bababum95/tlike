import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { Empty } from "@/components";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { getHistory } from "@/core/store/slices/history";

import styles from "./History.module.scss";
import classNames from "classnames";

const formatedDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  return `${timeString}, ${dateString}`;
};

export const History = () => {
  const { t } = useTranslation("wallet");
  const dispatch = useAppDispatch();
  const historyStore = useAppSelector((state) => state.history);

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("transaction-history")}</h1>
      {(historyStore.status === "loading" ||
        historyStore.status === "idle") && <div className={styles.loader} />}
      {historyStore.data.length ? (
        <motion.ul
          className={classNames(styles.list, {
            [styles.loading]: historyStore.status === "loading",
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.25 }}
        >
          {historyStore.data.map((item, index) => (
            <motion.li
              className={styles.item}
              key={item.id}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
              }}
            >
              <div>
                <p className={styles.type}>{t(item.type)}</p>
                <p className={styles.hint}>{formatedDate(item.date)}</p>
              </div>
              <div className={styles.end}>
                <p
                  className={classNames(styles.amount, {
                    [styles.districtive]: item.amount < 0,
                  })}
                >
                  {item.amount} {item.currency}
                </p>
                <p className={styles.hint}>{t("success")}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : historyStore.status === "loading" ||
        historyStore.status === "idle" ? null : (
        <Empty title={t("history-empty-title")} extraClass={styles.empty}>
          <p>{t("history-empty-text")}</p>
        </Empty>
      )}
    </div>
  );
};
