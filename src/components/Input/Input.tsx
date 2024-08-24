import type { FC } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

type Props = {
  label?: string;
  hint?: string;
  error?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ label, hint, error, ...props }) => {
  return (
    <label className={classNames(styles.input, { [styles.error]: !!error })}>
      {label}
      <input {...props} />
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </label>
  );
};
