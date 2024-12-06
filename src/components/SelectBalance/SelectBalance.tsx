import { FC } from "react";

import { TOKENS } from "@config";
import { useAppSelector } from "@hooks";
import { Select } from "@/components";

import styles from "./SelectBalance.module.scss";

type Props = {
  value: string;
  handleChange?: (value: string) => void;
  readonly?: boolean;
  label?: string;
};

export const SelectBalance: FC<Props> = ({ value, handleChange, readonly, label }) => {
  const balances = useAppSelector((state) => state.user).balances;

  const options = TOKENS.map(({ key, name, icon }) => ({
    label: (
      <div className={styles.option}>
        <div className={styles.token}>
          <img
            className={styles.icon}
            src={icon}
            alt={name}
            width={26}
            height={28}
          />
          {name}
        </div>
        <span className={styles.value}>
          {new Intl.NumberFormat("ru-RU").format(balances[key])}
        </span>
      </div>
    ),
    value: key,
  }));

  return (
    <Select
      label={label}
      options={options}
      value={value}
      handleChange={handleChange}
      readonly={readonly}
    />
  );
};
