import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import classNames from "classnames";

import { Link } from "@/components";
import { ChevronRightIcon } from "@images";
import {
  MAIN_SLIDER,
  AUTO_DELAY,
  SPRING_OPTIONS,
  SWIPE_CONFIDEBCE_THRESHOLD,
} from "@config";

import styles from "./Slider.module.scss";

export const Slider: FC = () => {
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

      if (x === 0) next();
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [imgIndex]);

  return (
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
            <Link key={idx} to={slide.link} className={styles.slide}>
              <motion.img src={slide.image} transition={SPRING_OPTIONS} />
            </Link>
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
  );
};
