import { Navigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import classNames from "classnames";

import { useAppDispatch } from "@hooks";
import { SelectBalance } from "@/components";
import { CopyIcon } from "@images";
import { setNotice } from "@/core/store/slices/notice";

import styles from "./StepTwo.module.scss";

export const StepTwo = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  if (!state || !state.wallet) {
    return <Navigate to="/wallet/deposit" />;
  }

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    dispatch(
      setNotice({ status: "successed", message: "Copied to clipboard" })
    );
  };

  return (
    <div>
      {state.qrLink && (
        <div className={styles.qr}>
          <QRCodeCanvas
            value={state.qrLink}
            size={200}
            level="M"
            includeMargin
            marginSize={1}
            imageSettings={{
              src: "/logo.png",
              height: 54,
              width: 54,
              opacity: 1,
              excavate: true,
            }}
          />
        </div>
      )}
      <SelectBalance value={state.token} readonly label="Ваш баланс" />
      <div className={styles.item}>
        <p className={styles.label}>Сеть</p>
        <div className={classNames(styles.value, styles.network)}>
          {state.network}
        </div>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Адрес для пополнения</p>
        <div className={styles.wrapper}>
          <div className={styles.value}>
            <p>{state.wallet}</p>
          </div>
          <button className={styles.copy} onClick={() => copy(state.wallet)}>
            <CopyIcon />
          </button>
        </div>
      </div>
      {state.comment ? (
        <div className={styles.item}>
          <p className={styles.label}>Комментарий</p>
          <div className={styles.wrapper}>
            <div className={styles.value}>
              <p>{state.comment}</p>
            </div>
            <button className={styles.copy} onClick={() => copy(state.comment)}>
              <CopyIcon />
            </button>
          </div>
          <p className={styles.notice}>
            Обратите внимание:
            <span className={styles.red}>
              {" "}
              Данный запрос действителен только в течение 2 часов. Убедитесь,
              что вы пополнили баланс в указанный срок. Если время истечет, вам
              нужно будет повторить процедуру заново
            </span>
          </p>
        </div>
      ) : (
        <p className={styles.notice}>
          <span className={styles.red}>
            Укажите комментарий при пополнении баланса, иначе вы потеряете свои
            монеты. Обратите внимание, что это уведомление актуально только в
            течение следующих 2 часов.
          </span>
        </p>
      )}
      <p className={styles.notice}>
        После пополнения баланса требуется время на обработку транзакции. Это
        может занять некоторое время.
      </p>
    </div>
  );
};
