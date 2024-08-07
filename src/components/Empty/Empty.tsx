import { FC } from "react";

import { emptyImage } from "@images";

import styles from "./Empty.module.scss";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const Empty: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <img src={emptyImage} alt="Empty" />
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
};
