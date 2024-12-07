import { FC } from "react";

import { useAppSelector } from "@hooks";
import { Input } from "@/components";

import styles from "./Tax.module.scss";

type Props = {
  title: string;
  token: string;
};

/**
 * Tax component displays the fixed fee for a specific token's commission.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The label for the input field.
 * @param {string} props.token - The token for which the commission is being displayed.
 *
 * @returns {JSX.Element | null} - Returns an Input component with the commission's fixed fee
 *                                  formatted as currency, or null if no commission is found.
 */
export const Tax: FC<Props> = ({ title, token }): JSX.Element | null => {
  const commissions = useAppSelector((state) => state.project.commissions);
  const commission = commissions.find(
    (item) => item.currency.toLowerCase() === token.toLowerCase()
  );

  if (!commission) return null;

  const value = new Intl.NumberFormat("ru-RU").format(commission.fixed_fee);

  return (
    <Input label={title} value={value} readOnly>
      <span className={styles.currency}>{commission.currency}</span>
    </Input>
  );
};
