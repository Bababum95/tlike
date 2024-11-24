import { FC } from "react";
import { motion, AnimatePresence } from "motion/react";

import styles from "./List.module.scss";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const List: FC<Props> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        className={styles.list}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: [50, -15, 0], opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        transition={{ duration: 0.3 }}
        layout
        key="list"
      >
        {children}
      </motion.ul>
    </AnimatePresence>
  );
};
