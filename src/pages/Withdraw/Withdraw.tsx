import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { useAppSelector, useAppDispatch } from "@/core/hooks";
import { Input, Toast } from "@/components";
import { api } from "@/core/api";
import { setNotice } from "@/core/store/slices/notice";
import { transferLike } from "@/core/store/slices/user";

import styles from "./Withdraw.module.scss";

type Errors = {
  address: string | null;
  total: string | null;
};

export const Withdraw = () => {
  const { t } = useTranslation("wallet");
  const user = useAppSelector((state) => state.user);
  const commission = useAppSelector((state) => state.project.commission);
  const dispatch = useAppDispatch();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [isValid, setIsValid] = useState({
    address: false,
    button: false,
  });
  const [values, setValues] = useState({
    address: "",
    total: "",
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
    if (total > user.balances.like) {
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

    try {
      const response = await api.get("withdraw/wallet", {
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
      dispatch(setNotice({ status: "error", message: "Wrong adress" }));
      setIsValid({ address: false, button: false });
      if (loading.transfer) setLoading({ transfer: false, address: false });
    }
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
      await dispatch(
        transferLike({
          currency: "Like",
          amount: Number(values.total),
          receiver: values.address,
        })
      ).unwrap();
      setValues({ address: "", total: "" });
      dispatch(setNotice({ status: "success", message: "Success!" }));
    } catch (err) {
      dispatch(setNotice({ status: "error", message: err }));
    } finally {
      setLoading((prev) => ({ ...prev, transfer: false }));
      setToastIsOpen(false);
    }
  };

  const openToast = () => {
    if (!values.address || !values.total) return;

    const total = Number(values.total);
    if (total < 2000) {
      setErrors({ ...errors, total: t("error-min") });
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

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Like {t("withdraw")}</h1>
      <Input
        label={t("address")}
        placeholder={t("address-placeholder")}
        value={values.address}
        name="address"
        onChange={onChange}
        error={errors.address}
        onBlur={idValidation}
      />
      <Input
        label={t("total")}
        placeholder={t("total-placeholder")}
        value={values.total}
        name="total"
        onChange={onChange}
        error={errors.total}
      >
        <button
          className={styles.max}
          onClick={() =>
            setValues({
              ...values,
              total: Math.floor(user.balances.like).toFixed(0),
            })
          }
        >
          Max
        </button>
      </Input>
      <Input label={t("tax")} placeholder={commission.toFixed(0)} readOnly>
        <span className={styles.currency}>LIKE</span>
      </Input>
      <button className={styles.submit} onClick={openToast}>
        {t("withdraw")}
      </button>
      <Toast isOpen={toastIsOpen} onClose={() => setToastIsOpen(false)}>
        <div className={styles.row}>
          <p>{t("to")}</p>
          <p>{`${values.address.slice(0, 4)}...${values.address.slice(-4)}`}</p>
        </div>
        <div className={styles.row}>
          <p>{t("withdraw")}</p>
          <p>{values.total} LIKE</p>
        </div>
        <div className={styles.row}>
          <p>{t("tax")}</p>
          <p>{commission} LIKE</p>
        </div>
        <div className={classNames(styles.row, styles.total)}>
          <p>{t("withdraw-total")}</p>
          <p>{Number(values.total) - commission} LIKE</p>
        </div>
        <p className={styles.hint}>{t("withdraw-hint")}</p>
        <button
          className={classNames(styles.submit, {
            [styles.loading]: loading.transfer,
          })}
          onClick={onSubmit}
          disabled={!isValid.button}
        >
          {t("withdraw")}
        </button>
      </Toast>
    </div>
  );
};
