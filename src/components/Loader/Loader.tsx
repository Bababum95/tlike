import { FC } from "react";
import { motion } from "motion/react";

import { loaderImage } from "@images";

import styles from "./Loader.module.scss";

type Props = {
  progress: number;
};

export const Loader: FC<Props> = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <motion.div
          className={styles.status}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <img src={loaderImage} alt="Loader" className={styles.image} />
    </div>
  );
};
