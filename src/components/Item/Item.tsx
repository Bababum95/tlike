import { FC } from "react";
import classNames from "classnames";

import { Link } from "@/components";

import styles from "./Item.module.scss";

type Props = {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  text?: string;
  extraClass?: string;
  link?: string;
};

export const Item: FC<Props> = ({
  children,
  icon,
  text,
  title,
  extraClass,
  link,
}) => {
  if (link) {
    return (
      <Link className={classNames(styles.item, extraClass)} to={link}>
        {icon}
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          {text && <p className={styles.text}>{text}</p>}
        </div>
        {children}
      </Link>
    );
  }

  return (
    <li className={classNames(styles.item, extraClass)}>
      {icon}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
      {children}
    </li>
  );
};
