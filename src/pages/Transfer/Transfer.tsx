import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { Input, Toast } from "@/components";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { api } from "@/core/api";
import { transferLove } from "@/core/store/slices/user";

import styles from "./Transfer.module.scss";
import { setNotice } from "@/core/store/slices/notice";

type Errors = {
  id: string | null;
  total: string | null;
};

export const Transfer = () => {
  const { t } = useTranslation("wallet");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const love = 3000;
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [isValid, setIsValid] = useState({
    id: false,
    button: false,
  });
  const [values, setValues] = useState({
    id: "",
    total: "",
  });
  const [errors, setErrors] = useState<Errors>({
    id: null,
    total: null,
  });
  const [loading, setLoading] = useState({
    validId: false,
    transfer: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id") {
      setIsValid((prev) => ({ ...prev, id: false }));
    }
    setErrors({ ...errors, [name]: null });
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const total = Number(values.total);
    if (total > love) {
      setErrors({ ...errors, total: t("error-not-enough") });
      setIsValid((prev) => ({ ...prev, button: false }));
    } else if (
      total &&
      values.id.length &&
      errors.id === null &&
      errors.total === null
    ) {
      setIsValid((prev) => ({ ...prev, button: true }));
    }
  }, [values]);

  const idValidation = async () => {
    setLoading((prev) => ({ ...prev, validId: true }));

    try {
      const response = await api.get("user/exist", {
        params: { user_id: values.id },
        headers: { "x-auth-token": user.token },
      });
      if (response.data.status === "exists") {
        setErrors({ ...errors, id: null });
        if (loading.transfer) onSubmit();
        setLoading((prev) => ({ ...prev, validId: false }));
      } else {
        throw new Error();
      }
    } catch (err) {
      setErrors({ ...errors, id: "ID does not exist" });
      dispatch(setNotice({ status: "error", message: "ID does not exist" }));
      setIsValid({ id: false, button: false });
      if (loading.transfer) {
        setLoading({ transfer: false, validId: false });
      }
    }
  };

  const onSubmit = async () => {
    setLoading((prev) => ({ ...prev, transfer: true }));
    dispatch(
      setNotice({ status: "loading", message: "Request Processing..." })
    );
    if (!isValid.id && !!errors.id) {
      idValidation();
      return;
    }

    if (loading.validId) return;

    try {
      await dispatch(
        transferLove({
          currency: "TLove",
          amount: values.total,
          receiver: values.id,
        })
      ).unwrap();
      setValues({ id: "", total: "" });
      dispatch(setNotice({ status: "success", message: "Success!" }));
    } catch (err) {
      dispatch(setNotice({ status: "error", message: err }));
    } finally {
      setLoading((prev) => ({ ...prev, transfer: false }));
      setToastIsOpen(false);
    }
  };

  const openToast = () => {
    if (!values.id || !values.total) return;

    const total = Number(values.total);
    if (total < 2000) {
      setErrors({ ...errors, total: t("error-min") });
      setIsValid((prev) => ({ ...prev, button: false }));
      return;
    }

    setToastIsOpen(true);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Love {t("transfer")}</h1>
      <Input
        label="ID"
        placeholder={t("id-placeholder")}
        value={values.id}
        name="id"
        onChange={onChange}
        error={errors.id}
        onBlur={idValidation}
        type="number"
      />
      <Input
        label={t("total")}
        placeholder={t("total-love-placeholder")}
        hint={t("total-love-hint")}
        value={values.total}
        name="total"
        onChange={onChange}
        error={errors.total}
        type="number"
      />
      <button
        className={styles.submit}
        disabled={!isValid.button}
        onClick={openToast}
      >
        {t("send")}
      </button>
      <Toast isOpen={toastIsOpen} onClose={() => setToastIsOpen(false)}>
        <div className={styles.row}>
          <p>{t("to")}</p>
          <p>ID: {values.id}</p>
        </div>
        <div className={styles.row}>
          <p>{t("send")}</p>
          <p>{values.total} LOVE</p>
        </div>
        <div className={styles.row}>
          <p>5% {t("to-burn")}</p>
          <p>{(Number(values.total) * 0.05).toFixed(0)} LOVE</p>
        </div>
        <div className={styles.row}>
          <p>5% {t("to-team")}</p>
          <p>{(Number(values.total) * 0.05).toFixed(0)} LOVE</p>
        </div>
        <div className={classNames(styles.row, styles.total)}>
          <p>{t("send-total")}</p>
          <p>
            {(Number(values.total) - Number(values.total) * 0.1).toFixed(0)}{" "}
            LOVE
          </p>
        </div>
        <p className={styles.hint}>{t("send-hint")}</p>
        <button
          className={classNames(styles.submit, {
            [styles.loading]: loading.transfer,
          })}
          onClick={onSubmit}
          disabled={!isValid.button}
        >
          {t("send")}
        </button>
      </Toast>
    </div>
  );
};
