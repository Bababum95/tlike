import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./List.module.scss";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const List: FC<Props> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        className={styles.list}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        transition={{ duration: 0.2 }}
        layout
        key="list"
      >
        {children}
      </motion.ul>
    </AnimatePresence>
  );
};