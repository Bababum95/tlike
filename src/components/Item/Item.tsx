import { FC } from "react";

import styles from "./Item.module.scss";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  icon: React.ReactNode;
  text: string;
  title: string;
};

export const Item: FC<Props> = ({ children, icon, text, title }) => {
  return (
    <li className={styles.item}>
      {icon}
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
      {children}
    </li>
  );
};
