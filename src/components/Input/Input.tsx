import type { FC } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

type Props = {
  label?: string;
  hint?: string;
  error?: string | null;
  children?: React.ReactNode | React.ReactNode[];
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Input component for rendering a labeled input field with optional hint and error messages.
 *
 * @component
 * @param {Object} props                                       - The props for the Input component.
 * @param {string} [props.label]                               - The label for the input field.
 * @param {string} [props.hint]                                - The hint text displayed below the input field.
 * @param {string|null} [props.error]                          - The error message displayed below the input field, if any.
 * @param {React.ReactNode|React.ReactNode[]} [props.children] - Optional children elements to be rendered alongside the input.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props  - Additional input attributes (e.g., type, value, onChange).
 *
 * @returns {JSX.Element} The rendered Input component.
 */
export const Input: FC<Props> = ({
  label,
  hint,
  error,
  children,
  ...props
}): JSX.Element => {
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
