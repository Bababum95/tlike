import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { BalancesType } from "@types";
import { useAppSelector } from "@hooks";
import { BalanceItem, Input, Navigation, Page } from "@/components";

import styles from "./Token.module.scss";

export const Token = () => {
  const [value, setValue] = useState("");
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

  console.log(stackingInfo);

  return (
    <Page>
      <div className={styles.page}>
        <h1>
          {t("title")} {stackingInfo.currency}
        </h1>
        <BalanceItem name={token} />
        <Input
          label="Забранировать сумму"
          placeholder={`Минимум ${stackingInfo.min_stake} ${stackingInfo.currency}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          max={balances[token]}
          type="number"
        >
          <button
            className={styles.max}
            onClick={() => {
              setValue(balances[token].toString());
            }}
          >
            Max
          </button>
        </Input>
      </div>
      <Navigation />
    </Page>
  );
};
