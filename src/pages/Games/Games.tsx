import { Navigation, Page } from "@/components";

import styles from "./Games.module.scss";

export const Games = () => {
  return (
    <Page back={false}>
      <div className={styles.page}>

      </div>
      <Navigation />
    </Page>
  );
};
