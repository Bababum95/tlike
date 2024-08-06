import { Link, useLocation } from "react-router-dom";
import { initHapticFeedback } from "@telegram-apps/sdk";
import classNames from "classnames";

import { mainRoutes } from "@/core/routes";

import styles from "./Navigation.module.scss";

const isActivePath = (currentPath: string, routePath: string) => {
  return currentPath === routePath;
};

export const Navigation = () => {
  const { impactOccurred } = initHapticFeedback();
  const { pathname } = useLocation();

  return (
    <nav className={styles.container}>
      {mainRoutes.map((route) => (
        <Link
          key={route.path}
          className={classNames(styles.link, {
            [styles.active]: isActivePath(pathname, route.path),
          })}
          to={route.path}
          onClick={() => impactOccurred("medium")}
        >
          <span className={styles.icon}>{route.icon}</span>
          {route.title}
        </Link>
      ))}
    </nav>
  );
};
