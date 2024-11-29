import { FC } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import type { BalancesType } from "@types";
import { useAppSelector } from "@hooks";
import { TOKENS } from "@/core/config";

import styles from "./BalanceItem.module.scss";

type Props = {
  name: keyof BalancesType;
  Element?: "li" | "div";
  direction?: "row" | "column";
  mining?: number;
  maximumFractionDigits?: number;
};

export const BalanceItem: FC<Props> = ({
  name,
  mining,
  Element = "div",
  direction = "row",
  maximumFractionDigits = 9,
}) => {
  const { t } = useTranslation("common");
  const user = useAppSelector((state) => state.user);
  const token = TOKENS.find((t) => t.key === name);
  const withMining = mining !== undefined;

  if (!token) return;

  return (
    <Element
      className={classNames(styles.item, styles[direction], {
        [styles["with-mining"]]: withMining,
      })}
    >
      <div className={styles.background} />
      <img className={styles.icon} src={token.icon} alt={token.name} />
      <div className={styles.balance}>
        <p className={styles.name}>
          {withMining && t("balance")} {token.name}
        </p>
        <p className={styles.value}>
          {new Intl.NumberFormat("ru-RU", { maximumFractionDigits }).format(
            user.balances[name]
          )}{" "}
          {withMining && token.name}
        </p>
      </div>
      {withMining && (
        <div className={styles.mining}>
          {direction === "row" && (
            <p className={styles.name}>{token.name} mining </p>
          )}
          <p className={styles.value}>
            {new Intl.NumberFormat("ru-RU", { maximumFractionDigits }).format(
              mining
            )}{" "}
            {token.name}/h
          </p>
        </div>
      )}
    </Element>
  );
};
