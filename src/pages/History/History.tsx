import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import classNames from "classnames";

import { ChevronRightIcon } from "@images";
import { Empty } from "@/components";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { getHistory } from "@/core/store/slices/history";

import styles from "./History.module.scss";

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
  const [page, setPage] = useState(1);
  const { t } = useTranslation("wallet");
  const dispatch = useAppDispatch();
  const historyStore = useAppSelector((state) => state.history);

  useEffect(() => {
    dispatch(getHistory({ page }));
    scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const onPageChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("transaction-history")}</h1>
      {(historyStore.status === "loading" ||
        historyStore.status === "idle") && <div className={styles.loader} />}
      {historyStore.records.length ? (
        <>
          <motion.ul
            className={classNames(styles.list, {
              [styles.loading]: historyStore.status === "loading",
            })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.25 }}
          >
            {historyStore.records.map((item, index) => (
              <motion.li
                className={styles.item}
                key={item.id}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                }}
              >
                <div>
                  <p className={styles.type}>{t(item.type)}</p>
                  <p className={styles.hint}>{formatedDate(item.date)}</p>
                  {item.transaction_info?.sender && (
                    <p className={styles.hint}>
                      From ID: {item.transaction_info?.sender.user_id}
                    </p>
                  )}
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
                  {item.transaction_info?.receiver && (
                    <p className={styles.hint}>
                      To ID: {item.transaction_info?.receiver.user_id}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>
          {historyStore.total_pages > 1 && (
            <Pagination
              page={page}
              total={historyStore.total_pages}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : historyStore.status === "loading" ||
        historyStore.status === "idle" ? null : (
        <Empty title={t("history-empty-title")} extraClass={styles.empty}>
          <p>{t("history-empty-text")}</p>
        </Empty>
      )}
    </div>
  );
};

type PaginationProps = {
  onPageChange: (value: number) => void;
  page: number;
  total: number;
};

const Pagination: FC<PaginationProps> = ({ onPageChange, page, total }) => {
  const startPage =
    page < total ? Math.max(1, page - 1) : Math.max(1, page - 2);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.back}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronRightIcon />
      </button>
      <div className={styles.buttons}>
        {startPage > 1 && <span>...</span>}

        {new Array(3).fill(0).map((_, index) => (
          <button
            key={index}
            className={classNames(styles.button, {
              [styles.active]: startPage + index === page,
            })}
            onClick={() => onPageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}

        {startPage < total - 2 && <span>...</span>}
      </div>
      <button
        className={styles.forward}
        onClick={() => onPageChange(page + 1)}
        disabled={total === page}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
