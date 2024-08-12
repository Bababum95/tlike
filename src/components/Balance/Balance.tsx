import { motion } from "framer-motion";

import { heartImage, thumbImage } from "@images";
import { useAppSelector } from "@/core/hooks";

import styles from "./Balance.module.scss";

export const Balance = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      layout
      className={styles.container}
    >
      <div className={styles.item}>
        <img height="28px" src={thumbImage} alt="Like" />
        <p className={styles.title}>Like balance</p>
        <p className={styles.value}>{user.balances.tlike} Like</p>
        <p className={styles.unit}>{user.mining_speed.tlike} Like/h</p>
      </div>
      <div className={styles.item}>
        <img src={heartImage} alt="Love" />
        <p className={styles.title}>Love balance</p>
        <p className={styles.value}>{user.balances.tlove} Love</p>
        <p className={styles.unit}>{user.mining_speed.tlove} Love/h</p>
      </div>
    </motion.div>
  );
};
