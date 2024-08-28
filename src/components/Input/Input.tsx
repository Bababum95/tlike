import type { FC } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

type Props = {
  label?: string;
  hint?: string;
  error?: string | null;
  children?: React.ReactNode | React.ReactNode[];
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  label,
  hint,
  error,
  children,
  ...props
}) => {
  return (
    <label className={classNames(styles.input, { [styles.error]: !!error })}>
      {label}
      <div className={styles.container}>
        <input {...props} />
        {children}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </label>
  );
};
