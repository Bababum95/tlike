import { useState } from "react";

import { SelectBalance, Select } from "@/components";

import styles from "./StepOne.module.scss";

export const StepOne = () => {
  const [value, setValue] = useState({
    token: "usdt",
    network: "ton",
  });

  return (
    <>
      <SelectBalance
        value={value.token}
        handleChange={(token) => {
          const network = token === "usdt" ? value.network : "ton";
          setValue({ token, network });
        }}
      />

      <Select
        label="Сеть"
        value={value.network}
        handleChange={(network) => setValue({ ...value, network })}
        options={[
          { label: "TON", value: "ton" },
          { label: "TRC20 (доступно только для USDT)", value: "trc" },
        ]}
      />

      <div className={styles.bottom}>
        <button className="primary-button full">Продолжить</button>
      </div>
    </>
  );
};
