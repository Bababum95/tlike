import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { mainRoutes } from "@/core/routes";
import { Link } from "@/components";

import styles from "./Navigation.module.scss";

const isActivePath = (currentPath: string, routePath: string) => {
  if (routePath === "/" && currentPath !== "/") {
    return false;
  }

  return currentPath.startsWith(routePath);
};

export const Navigation = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation("common");

  return (
    <nav className={styles.container}>
      {mainRoutes.map((route) => (
        <Link
          key={route.path}
          className={classNames(styles.link, {
            [styles.active]: isActivePath(pathname, route.path),
          })}
          to={route.path}
        >
          <span className={styles.icon}>{route.icon}</span>
          {route.title && t(route.title)}
        </Link>
      ))}
    </nav>
  );
};
