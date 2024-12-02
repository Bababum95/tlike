import { FC, useState, useEffect } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

import { ChevronRightIcon } from "@images";

import styles from "./Select.module.scss";

type Props = {
  label?: string;
  value: string;
  handleChange: (value: string) => void;
  options: {
    label: React.ReactNode;
    value: string;
  }[];
};

/**
 * Select component for rendering a dropdown list.
 * @returns {JSX.Element} The rendered Select component.
 */
export const Select: FC<Props> = ({
  label,
  options,
  value,
  handleChange,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selected = options.find(
    ({ value: optionValue }) => optionValue === value
  );

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", close);
    } else {
      document.removeEventListener("click", close);
    }

    return () => {
      document.removeEventListener("click", close);
    };
  }, [isOpen]);

  return (
    <div className={styles.select}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.wrapper} onClick={(evt) => evt.stopPropagation()}>
        <motion.ul
          className={styles.list}
          initial="close"
          animate={isOpen ? "open" : "close"}
          exit="close"
          transition={{ duration: 0.3, type: "tween" }}
          variants={{
            open: {
              height: 28 * options.length + 10 * (options.length - 1) + 28,
            },
            close: { height: 56 },
          }}
        >
          {options.map(({ label, value }) => (
            <motion.li
              key={value}
              className={classNames(styles.option, {
                [styles.active]: value === selected?.value,
              })}
              variants={{
                open: { opacity: 1 },
                close: { opacity: 0 },
              }}
              animate={isOpen || selected?.value === value ? "open" : "close"}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (isOpen && value !== selected?.value) handleChange(value);
                if (!isOpen) {
                  open();
                } else {
                  close();
                }
              }}
            >
              {label}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          className={styles.arrow}
          variants={{
            open: { rotate: 270 },
            close: { rotate: 90 },
          }}
          initial="close"
          transition={{ duration: 0.2 }}
          animate={isOpen ? "open" : "close"}
        >
          <ChevronRightIcon />
        </motion.div>
      </div>
    </div>
  );
};
