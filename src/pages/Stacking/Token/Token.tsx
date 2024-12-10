import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import type { BalancesType, StackingRate } from "@types";
import { useAppSelector } from "@hooks";
import {
  BalanceItem,
  Input,
  Navigation,
  Page,
  Toast,
  Link,
} from "@/components";

import styles from "./Token.module.scss";

const today = new Date();
const stackingDate = today.toLocaleDateString("ru-RU").replace(/\./g, "-");
const endDate = new Date(today);

const getEstimatedAmounts = (
  value: number,
  rate: StackingRate,
  period: number
): string => {
  if (!rate.min || !value) return "--";
  let output: string;
  const min = (value * (rate.min / 100) * (period / 365)) / rate.exchange_rate;

  output = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(
    min
  );

  if (rate.max) {
    const max =
      (value * (rate.max / 100) * (period / 365)) / rate.exchange_rate;

    if (max < 0.01) return "--";

    output += `-${new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 2,
    }).format(max)}`;
  }

  return output;
};

export const Token = () => {
  const [value, setValue] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { token } = useParams<{ token: keyof BalancesType }>();
  const { t } = useTranslation("stacking");
  const stackingStore = useAppSelector((state) => state.stacking);
  const balances = useAppSelector((state) => state.user.balances);

  const stackingInfo = stackingStore.settings.find(
    (t) => t.currency.toLowerCase() === token
  );

  if (!stackingInfo || !token || !balances[token]) {
    return <Navigate to="/stacking" />;
  }

  endDate.setDate(today.getDate() + stackingInfo.period_days);
  const stackingEndDate = endDate
    .toLocaleDateString("ru-RU")
    .replace(/\./g, "-");

  return (
    <Page>
      <div className={styles.page}>
        <h1 className={styles.title}>
          {t("title")} {stackingInfo.currency}
        </h1>
        <BalanceItem name={token} />
        <div className={styles.space} />
        <Input
          label="Забранировать сумму"
          placeholder={`Минимум ${stackingInfo.min_stake} ${stackingInfo.currency}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          max={balances[token]}
          type="number"
        >
          <button
            className="max"
            onClick={() => {
              setValue(balances[token].toString());
            }}
          >
            Max
          </button>
        </Input>

        <ul className={styles.list}>
          {stackingInfo.rates.map(
            (rate) =>
              rate.min && (
                <li className={styles.item} key={rate.currency}>
                  <p className={styles.label}>
                    {t("annum")} {rate.currency}
                  </p>
                  <p className={styles.value}>{`${rate.min}-${rate.max}%`}</p>
                </li>
              )
          )}
          <li className={styles.item}>
            <p className={styles.label}>{t("stacking-date")}</p>
            <p className={styles.value}>{stackingDate}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.label}>{t("stacking-time")}</p>
            <p className={styles.value}>
              {stackingInfo.period_days} {t("days")}
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.label}>{t("stacking-end-date")}</p>
            <p className={styles.value}>{stackingEndDate}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.title}>{t("estimated-amount")}</p>
            <ul className={styles.estimated}>
              {stackingInfo.rates.map(
                (rate) =>
                  rate.min && (
                    <li className={styles.item} key={rate.currency}>
                      <p className={styles.label}>{rate.currency}</p>
                      <p className={styles.value}>
                        {getEstimatedAmounts(
                          Number(value),
                          rate,
                          stackingInfo.period_days
                        )}
                      </p>
                    </li>
                  )
              )}
            </ul>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => setToastIsOpen(true)}
          className={classNames("primary-button full", {
            disabled: Number(value) < stackingInfo.min_stake,
          })}
        >
          {t("start-stacking")}
        </button>
      </div>
      <Navigation />
      <Toast isOpen={toastIsOpen} onClose={() => setToastIsOpen(false)}>
        <form className={styles.toast}>
          <h2 className={styles.title}>{t("attention")}</h2>
          <p className={styles.text}>{t("toast-text")}</p>
          <label className={styles.checkbox}>
            <input
              required
              type="checkbox"
              className={styles.input}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className={styles.text}>
              {t("read")}{" "}
              <Link to="/stacking/info" className={styles.link}>
                {t("staking-conditions")}
              </Link>
            </p>
          </label>
          <button
            type="submit"
            className={classNames("primary-button full", {
              disabled: !isChecked,
            })}
          >
            {t("confirm")}
          </button>
        </form>
      </Toast>
    </Page>
  );
};
