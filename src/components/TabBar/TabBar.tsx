import { FC } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";

import { Link } from "@/components";

import styles from "./TabBar.module.scss";

type Props = {
  links: {
    label: string;
    path: string;
  }[];
};

export const TabBar: FC<Props> = ({ links }) => {
  const location = useLocation();
  const width = 100 / links.length;
  const isActivePath = links.findIndex(
    ({ path }) => path === location.pathname
  );

  return (
    <nav className={styles.nav}>
      <motion.div
        layoutId="background"
        className={styles.background}
        style={{
          width: `calc(${width}% - 4px)`,
          left: `max(${width}% * ${isActivePath}, 2px)`,
        }}
      />
      {links.map(({ label, path }) => (
        <Link key={path} className={styles.link} to={path}>
          {label}
        </Link>
      ))}
    </nav>
  );
};
