import { FC } from "react";
import { motion } from "framer-motion";

import { initialOverlay, initialToast } from "./config";
import styles from "./Toast.module.scss";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

/**
 * Props for the Toast component.
 *
 * @property {boolean} isOpen           - Indicates if the toast is currently open.
 * @property {() => void} [onClose]     - Optional callback function to be called when the toast is closed.
 * @property {React.ReactNode} children - The content to be displayed inside the toast.
 *
 * @returns {JSX.Element} The rendered Toast component.
 */
export const Toast: FC<Props> = ({
  isOpen,
  onClose,
  children,
}): JSX.Element => {
  return (
    <>
      <motion.div
        initial={initialOverlay}
        animate={isOpen ? { opacity: 1, display: "block" } : initialOverlay}
        onClick={onClose}
        tabIndex={0}
        role="none"
        transition={{ duration: 0.2 }}
        className={styles.overlay}
      />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.toast}
        role="dialog"
        tabIndex={0}
        aria-live="polite"
        aria-label="Toast"
        aria-atomic="true"
        initial={initialToast}
        animate={isOpen ? { opacity: 1, y: 0, display: "block" } : initialToast}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};
