import { FC } from 'react';
import { motion } from 'framer-motion';

import { initialOverlay, initialToast } from './config';
import styles from './Toast.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Toast: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <motion.div
        initial={initialOverlay}
        animate={isOpen ? { opacity: 1, display: 'block' } : initialOverlay}
        onClick={onClose}
        tabIndex={0}
        role='none'
        transition={{ duration: 0.3 }}
        className={styles.overlay}
      />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.toast}
        role='dialog'
        tabIndex={0}
        aria-live='polite'
        aria-label='Toast'
        aria-atomic='true'
        initial={initialToast}
        animate={isOpen ? { opacity: 1, y: 0, display: 'block' } : initialToast}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};
