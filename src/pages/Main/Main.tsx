import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import classNames from "classnames";

import { Navigation, User, Balance } from "@/components";
import { ChevronRightIcon, minerImage, SettingIcon, WalletIcon } from "@images";
import {
  MAIN_SLIDER,
  AUTO_DELAY,
  SPRING_OPTIONS,
  SWIPE_CONFIDEBCE_THRESHOLD,
} from "@config";

import styles from "./Main.module.scss";

export const Main = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const next = () => {
    setImgIndex((pv) => {
      if (pv === MAIN_SLIDER.length - 1) {
        return 0;
      }
      return pv + 1;
    });
  };

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        next();
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [imgIndex]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <User />
        <Link className={styles.wallet} to="/wallet">
          <WalletIcon />
          <span>Wallet</span>
        </Link>
        <Link className={styles.settings} to="/settings">
          <SettingIcon />
        </Link>
      </header>
      <img className={styles.miner} src={minerImage} alt="Miner" />
      <Balance />
      <div className={styles.slider}>
        <AnimatePresence initial={false}>
          <motion.div
            drag="x"
            style={{
              x: dragX,
            }}
            animate={{
              translateX: `-${imgIndex * 100}%`,
            }}
            initial="enter"
            exit="exit"
            transition={SPRING_OPTIONS}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (
                swipe < -SWIPE_CONFIDEBCE_THRESHOLD &&
                imgIndex < MAIN_SLIDER.length - 1
              ) {
                setImgIndex((pv) => pv + 1);
              } else if (swipe > SWIPE_CONFIDEBCE_THRESHOLD && imgIndex > 0) {
                setImgIndex((pv) => pv - 1);
              }
            }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            className={styles.swiper}
          >
            {MAIN_SLIDER.map((slide, idx) => (
              <motion.img
                key={idx}
                src={slide}
                transition={SPRING_OPTIONS}
                className={styles.slide}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <div className={styles.buttons}>
          {imgIndex > 0 && (
            <button
              className={classNames(styles.button, styles.left)}
              onClick={() => setImgIndex((prev) => Math.max(prev - 1, 0))}
            >
              <ChevronRightIcon />
            </button>
          )}
          {imgIndex < MAIN_SLIDER.length - 1 && (
            <button
              className={classNames(styles.button, styles.right)}
              onClick={next}
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};
