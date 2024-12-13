import { type FC, type ReactNode, useId } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";

import { Link } from "@/components";

import styles from "./TabBar.module.scss";

type LinkProps = {
  type: "link";
  links: {
    label: ReactNode;
    path: string;
  }[];
};

type ButtonProps = {
  type: "button";
  onClick: (id: string) => void;
  active: string;
  links: {
    label: ReactNode;
    id: string;
  }[];
};

type Props = LinkProps | ButtonProps;

export const TabBar: FC<Props> = (props) => {
  const { type, links } = props;
  const id = useId();
  const location = useLocation();
  const width = 100 / props.links.length;
  const isActive =
    type === "link"
      ? links.findIndex((link) => link.path === location.pathname)
      : links.findIndex((link) => link.id === props.active);

  return (
    <nav className={styles.nav}>
      <motion.div
        layoutId={id}
        className={styles.background}
        style={{
          width: `calc(${width}% - 4px)`,
          left: `max(${width}% * ${isActive}, 2px)`,
        }}
      />
      {type === "link"
        ? links.map(({ label, path }) => (
            <Link key={path} className={styles.link} to={path}>
              {label}
            </Link>
          ))
        : links.map(({ label, id }) => (
            <button
              key={id}
              className={styles.link}
              onClick={() => props.onClick(id)}
            >
              {label}
            </button>
          ))}
    </nav>
  );
};
