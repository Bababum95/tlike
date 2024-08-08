import { heartImage, thumbImage } from "@images";

import styles from "./Balance.module.scss";

export const Balance = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img height="28px" src={thumbImage} alt="Like" />
        <p className={styles.title}>Like balance</p>
        <p className={styles.value}>0 Like</p>
        <p className={styles.unit}>0 Like/h</p>
      </div>
      <div className={styles.item}>
        <img src={heartImage} alt="Love" />
        <p className={styles.title}>Love balance</p>
        <p className={styles.value}>0 Love</p>
        <p className={styles.unit}>0 Love/h</p>
      </div>
    </div>
  );
};
