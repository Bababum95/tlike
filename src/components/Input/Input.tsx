import { FC } from "react";

import styles from "./Input.module.scss";

type Props = {
  label?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ label, hint, ...props }) => {
  return (
    <label className={styles.input}>
      {label}
      <input {...props} />
      {hint && <p className={styles.hint}>{hint}</p>}
    </label>
  );
};
