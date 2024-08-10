import { FC } from "react";

import { emptyImage } from "@images";

import styles from "./Empty.module.scss";
import classNames from "classnames";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
  extraClass?: string;
};

export const Empty: FC<Props> = ({ title, children, extraClass }) => {
  return (
    <div className={classNames(styles.container, extraClass)}>
      <img src={emptyImage} alt="Empty" />
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
};
