import classNames from "classnames";
import { Navigation, Page, Link } from "@/components";

import styles from "./Games.module.scss";

export const Games = () => {
  return (
    <Page back={false}>
      <div className={styles.page}>
        <article className={styles.article}>
          <div>
            <h2>Взлом серверов</h2>
          </div>
          <div className={styles.card}>
            <Link to="open-chest">
              <img
                className={styles.image}
                src="/images/games/open-chest.png"
                alt="Open Chest"
              />
              <button
                className={classNames("primary-button full", styles.button)}
              >
                Играть
              </button>
            </Link>
          </div>
        </article>
      </div>
      <Navigation />
    </Page>
  );
};
