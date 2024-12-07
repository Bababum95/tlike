import { FC } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { useAppSelector } from "@hooks";
import { Toast } from "@/components";

import styles from "./Withdraw.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  address: string;
  token: string;
  network: string;
  total: string;
  disabled: boolean;
  loading: boolean;
};

/**
 * ConfirmationToast component displays a toast notification for withdrawal confirmation.
 * Props for the ConfirmationToast component.
 * @property {boolean} isOpen - Indicates if the toast is open.
 * @property {() => void} onClose - Function to call when the toast is closed.
 * @property {() => void} onSubmit - Function to call when the withdraw action is submitted.
 * @property {string} address - The address to which the withdrawal is being made.
 * @property {string} token - The type of token being withdrawn.
 * @property {string} network - The network being used for the withdrawal.
 * @property {string} total - The total amount being withdrawn.
 * @property {boolean} disabled - Indicates if the submit button should be disabled.
 * @property {boolean} loading - Indicates if the withdrawal is in progress.
 * @returns {JSX.Element} The rendered component.
 */
export const ConfirmationToast: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  address,
  token,
  network,
  total,
  disabled,
  loading,
}): JSX.Element => {
  const { t } = useTranslation("wallet");
  const commissions = useAppSelector((state) => state.project.commissions);
  const commission = commissions.find(
    (item) => item.currency.toLowerCase() === token.toLowerCase()
  );

  const tax = new Intl.NumberFormat("ru-RU").format(commission?.fixed_fee || 0);
  const currency = commission?.currency || token;
  const subtotal = new Intl.NumberFormat("ru-RU").format(
    Number(total) - Number(commission?.fixed_fee)
  );

  return (
    <Toast isOpen={isOpen} onClose={onClose}>
      <div className={styles.row}>
        <p>Сеть</p>
        <p>{network}</p>
      </div>
      <div className={styles.row}>
        <p>{t("to")}</p>
        <p>{address}</p>
      </div>
      <div className={styles.row}>
        <p>{t("withdraw")}</p>
        <p>{`${total} ${currency}`}</p>
      </div>
      <div className={styles.row}>
        <p>{t("tax")}</p>
        <p>{`${tax} ${currency}`}</p>
      </div>
      <div className={classNames(styles.row, styles.total)}>
        <p>{t("withdraw-total")}</p>
        <p>{`${subtotal} ${currency}`}</p>
      </div>
      <p className={styles.hint}>{t("withdraw-hint")}</p>
      <button
        className={classNames(styles.submit, { [styles.loading]: loading })}
        onClick={onSubmit}
        disabled={disabled}
      >
        {t("withdraw")}
      </button>
    </Toast>
  );
};
