import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { initInitData } from "@telegram-apps/sdk";
import classNames from "classnames";

import { Navigation, User, Balance, Link } from "@/components";
import {
  ChevronRightIcon,
  minerAnimation,
  minerOffImage,
  SettingIcon,
  WalletIcon,
} from "@images";
import {
  MAIN_SLIDER,
  AUTO_DELAY,
  SPRING_OPTIONS,
  SWIPE_CONFIDEBCE_THRESHOLD,
} from "@config";

import styles from "./Main.module.scss";
import axios from "axios";

export const Main = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const initData = initInitData();
  const dragX = useMotionValue(0);

  const shareData = () => {
    axios.post("https://shit.foreignpay.ru/webhook/telegram/front", initData);
  };

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
      <video
        className={styles.miner}
        src={minerAnimation}
        autoPlay={false}
        loop
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
        poster={minerOffImage}
      >
        <source src={minerAnimation} type="video/mp4" data-wf-ignore="true" />
      </video>
      <button onClick={shareData}>
        Share InitData
      </button>
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
      <Navigation />
    </div>
  );
};
