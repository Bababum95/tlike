import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";

import {
  ChevronRightIcon,
  roadmapImage,
  TelegramLogoIcon,
  XLogoIcon,
  NetIcon,
  YouTubeLogoIcon,
  TikTokLogoIcon,
  InstagramLogoIcon,
} from "@images";
import { Item, Link, List, Navigation } from "@/components";

import styles from "./Settings.module.scss";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const Settings = () => {
  const { t, i18n } = useTranslation("settings");
  const [langIsOpen, setlangIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setlangIsOpen(false);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("settings")}</h1>
      <p className={styles.language}>{t("language")}</p>
      <motion.div
        initial={false}
        animate={langIsOpen ? "open" : "closed"}
        className={styles.select}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setlangIsOpen(!langIsOpen)}
          variants={{
            open: { color: "#007aff", borderColor: "#007aff" },
            closed: {
              color: "#a2acb0",
              borderColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          {t(i18n.language)}
          <motion.div
            variants={{
              open: { rotate: 270 },
              closed: { rotate: 90 },
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRightIcon />
          </motion.div>
        </motion.button>
        <motion.ul
          variants={{
            open: {
              height: "auto",
              marginTop: 14,
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.6,
                delayChildren: 0.2,
                staggerChildren: 0.05,
              },
            },
            closed: {
              height: 0,
              marginTop: 0,
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: langIsOpen ? "auto" : "none" }}
        >
          <motion.li
            onClick={() => changeLanguage("ru")}
            variants={itemVariants}
          >
            {t("ru")}
          </motion.li>
          <motion.li
            onClick={() => changeLanguage("en")}
            variants={itemVariants}
          >
            {t("en")}
          </motion.li>
        </motion.ul>
      </motion.div>
      <List>
        <Item extraClass={styles.item} title={t("about-project")}>
          <ChevronRightIcon />
        </Item>
        <Item
          extraClass={styles.item}
          title={t("how-to-start")}
          link="/onboarding"
        >
          <ChevronRightIcon />
        </Item>
        <li className={styles["stat-item"]}>
          <p className={styles.label}>{t("active-users")}</p>
          <p className={styles.value}>1 427</p>
        </li>
        <li className={styles["stat-item"]}>
          <p className={styles.label}>Like {t("mined")}</p>
          <p className={styles.value}>1 427</p>
        </li>
        <li className={styles["stat-item"]}>
          <p className={styles.label}>Love {t("earned")}</p>
          <p className={styles.value}>1 427</p>
        </li>
        <li className={styles["stat-item"]}>
          <p className={styles.label}>Like {t("burned")}</p>
          <p className={styles.value}>1 427</p>
        </li>
        <li className={styles["stat-item"]}>
          <p className={styles.label}>Love {t("burned")}</p>
          <p className={styles.value}>1 427</p>
        </li>
        <li className={styles["stat-item"]}>
          <p className={styles.label}>{t("next-halving")}</p>
          <p className={styles.value}>1 427</p>
        </li>
      </List>
      <img className={styles.roadmap} src={roadmapImage} alt="Roadmap" />
      <nav className={styles.socials}>
        <Link className={styles.social} to="#">
          <TelegramLogoIcon />
        </Link>
        <Link className={styles.social} to="#">
          <XLogoIcon />
        </Link>
        <Link className={styles.social} to="#">
          <NetIcon />
        </Link>
        <Link className={styles.social} to="#">
          <YouTubeLogoIcon />
        </Link>
        <Link className={styles.social} to="#">
          <TikTokLogoIcon />
        </Link>
        <Link className={styles.social} to="#">
          <InstagramLogoIcon />
        </Link>
      </nav>
      <Navigation />
    </div>
  );
};