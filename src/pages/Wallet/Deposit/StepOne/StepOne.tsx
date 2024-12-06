import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { SelectBalance, Select, Input } from "@/components";
import { useAppSelector } from "@hooks";
import { api } from "@/core/api";

import styles from "./StepOne.module.scss";

export const StepOne = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState({
    token: "usdt",
    network: "ton",
    address: "",
  });

  const request = async () => {
    try {
      const network = value.network;

      const response = await api({
        method: network === "tron" ? "post" : "get",
        url: `/deposit/onchain/${network}`,
        headers: { "x-auth-token": token },
        data: { wallet_adress: value.address },
      });

      return {
        wallet: response.data[`deposit_wallet_${network}`],
        comment: response.data[`deposit_comment_${network}`],
        qrLink: response.data.qr_link,
      };
    } catch (error) {
      throw error;
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);

    try {
      const data = await request();
      navigate("/wallet/deposit/step-two", { state: { ...value, ...data } });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SelectBalance
        value={value.token}
        handleChange={(token) => {
          const network = token === "usdt" ? value.network : "ton";
          setValue({ token, network, address: "" });
        }}
      />

      <Select
        label="Сеть"
        value={value.network}
        readonly={value.token !== "usdt"}
        handleChange={(network) => setValue({ ...value, network })}
        options={[
          { label: "TON", value: "ton" },
          { label: "TRC20 (доступно только для USDT)", value: "tron" },
        ]}
      />

      {value.network === "tron" && (
        <>
          <Input
            label="Ваш адрес кошелька TRC20"
            value={value.address}
            onChange={(evt) =>
              setValue({ ...value, address: evt.target.value })
            }
          />
          <p className={styles.warning}>
            Обязательно введите адрес кошелька, с которого будет пополнен
            баланс, и нажмите 'Продолжить'.
          </p>
        </>
      )}

      <div className={styles.bottom}>
        <button
          onClick={handleContinue}
          className={classNames("primary-button full", {
            disabled: value.address.length < 3 && value.network === "tron",
            loading: isLoading,
          })}
        >
          Продолжить
        </button>
      </div>
    </>
  );
};
