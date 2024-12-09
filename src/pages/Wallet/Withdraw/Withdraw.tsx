import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { BalancesType } from "@types";
import { Input, SelectBalance, Select, Page } from "@/components";
import { useAppSelector, useAppDispatch } from "@/core/hooks";
import { api } from "@/core/api";
import { withdraw } from "@/core/store/thunks";
import { setNotice } from "@/core/store/slices/notice";

import { ConfirmationToast } from "./ConfirmationToast";
import { Tax } from "./Tax";
import styles from "./Withdraw.module.scss";

type Errors = {
  address: string | null;
  total: string | null;
};

export const Withdraw = () => {
  const { t } = useTranslation("wallet");
  const user = useAppSelector((state) => state.user);
  const commissions = useAppSelector((state) => state.project.commissions);
  const dispatch = useAppDispatch();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [isValid, setIsValid] = useState({
    address: false,
    button: false,
  });
  const [values, setValues] = useState<{
    address: string;
    total: string;
    token: keyof BalancesType;
    network: string;
  }>({
    address: "",
    total: "",
    token: "like",
    network: "ton",
  });
  const [errors, setErrors] = useState<Errors>({
    address: null,
    total: null,
  });
  const [loading, setLoading] = useState({
    address: false,
    transfer: false,
  });

  useEffect(() => {
    const total = Number(values.total);
    if (total > user.balances[values.token]) {
      setErrors({ ...errors, total: t("error-not-enough") });
      setIsValid((prev) => ({ ...prev, button: false }));
    } else if (
      total &&
      values.address.length &&
      errors.address === null &&
      errors.total === null
    ) {
      setIsValid((prev) => ({ ...prev, button: true }));
    }
  }, [values]);

  const idValidation = async () => {
    setLoading((prev) => ({ ...prev, validId: true }));
    const url =
      values.network === "ton" ? "withdraw/wallet" : "withdraw/wallet/tron";

    try {
      const response = await api.get(url, {
        params: { id: values.address },
        headers: { "x-auth-token": user.token },
      });
      if (response.status === 200) {
        setErrors({ ...errors, address: null });
        if (loading.transfer) onSubmit();
        setLoading((prev) => ({ ...prev, address: false }));
      } else {
        throw new Error();
      }
    } catch (err) {
      setErrors({ ...errors, address: "Wrong adress" });
      dispatch(setNotice({ status: "failed", message: "Wrong adress" }));
      setIsValid({ address: false, button: false });
      if (loading.transfer) setLoading({ transfer: false, address: false });
    }
  };

  const getTokennInfo = () => {
    return commissions.find(
      (item) => item.currency.toLowerCase() === values.token.toLowerCase()
    );
  };

  const onSubmit = async () => {
    setLoading((prev) => ({ ...prev, transfer: true }));
    dispatch(
      setNotice({ status: "loading", message: "Request Processing..." })
    );
    if (!isValid.address && !!errors.address) {
      idValidation();
      return;
    }

    if (loading.address) return;

    try {
      const tokenInfo = getTokennInfo();
      if (!tokenInfo) throw new Error("Token info not found");

      const response = await dispatch(
        withdraw({
          currency: tokenInfo.currency,
          amount: Number(values.total),
          receiver: values.address,
          network: values.network.toUpperCase(),
        })
      ).unwrap();
      if (response.meta.requestStatus === "fulfilled") {
        setValues((prev) => ({ ...prev, address: "", total: "" }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, transfer: false }));
      setToastIsOpen(false);
    }
  };

  const openToast = () => {
    if (!values.address || !values.total) return;

    const tokenInfo = getTokennInfo();

    if (!tokenInfo) return;

    const total = Number(values.total);
    if (total < tokenInfo.min_withdrawal) {
      setErrors({
        ...errors,
        total: t("error-min", {
          token: tokenInfo.currency,
          amount: tokenInfo.min_withdrawal,
        }),
      });
      setIsValid((prev) => ({ ...prev, button: false }));
      return;
    }

    setToastIsOpen(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id") setIsValid((prev) => ({ ...prev, id: false }));
    setErrors({ ...errors, [name]: null });
    setValues({ ...values, [name]: value });
  };

  const handleChangeToken = (token: string) => {
    const network = token === "usdt" ? values.network : "ton";
    setErrors({ ...errors, total: null });
    setValues((prev) => ({
      ...prev,
      network,
      token: token as keyof BalancesType,
    }));
  };

  return (
    <Page>
      <div className={styles.page}>
        <h1 className={styles.title}>{t("withdraw")}</h1>
        <SelectBalance value={values.token} handleChange={handleChangeToken} />
        <Select
          label="Сеть"
          value={values.network}
          readonly={values.token !== "usdt"}
          handleChange={(network) =>
            setValues((prev) => ({ ...prev, network }))
          }
          options={[
            { label: "Toncoin", value: "ton" },
            { label: "TRC20", value: "trc20" },
          ]}
        />

        <Input
          label={t("address")}
          placeholder={t("address-placeholder", {
            network: values.network.toUpperCase(),
          })}
          value={values.address}
          name="address"
          onChange={onChange}
          error={errors.address}
          onBlur={idValidation}
        />
        <div className={styles.divider} />
        <Input
          label={t("total")}
          placeholder={t("total-placeholder", {
            token: values.token.toUpperCase(),
          })}
          value={values.total}
          name="total"
          onChange={onChange}
          error={errors.total}
          type="number"
          onBlur={() => {
            const tokenInfo = getTokennInfo();
            if (tokenInfo && Number(values.total) < tokenInfo.min_withdrawal) {
              setErrors({
                ...errors,
                total: t("error-min", {
                  token: tokenInfo.currency,
                  amount: tokenInfo.min_withdrawal,
                }),
              });
            }
          }}
        >
          <button
            className="max"
            onClick={() => {
              setErrors({ ...errors, total: null });
              setValues({
                ...values,
                total: user.balances[values.token].toString(),
              });
            }}
          >
            Max
          </button>
        </Input>
        <div className={styles.divider} />
        <Tax title={t("tax")} token={values.token} />
        <button
          className={styles.submit}
          onClick={openToast}
          disabled={!isValid.button}
        >
          {t("withdraw")}
        </button>
        <ConfirmationToast
          isOpen={toastIsOpen}
          onClose={() => setToastIsOpen(false)}
          onSubmit={onSubmit}
          address={`${values.address.slice(0, 4)}...${values.address.slice(
            -4
          )}`}
          total={values.total}
          token={values.token}
          network={values.network.toUpperCase()}
          disabled={!isValid.button}
          loading={loading.transfer}
        />
      </div>
    </Page>
  );
};
