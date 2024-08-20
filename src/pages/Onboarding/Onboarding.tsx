import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { initUtils } from "@telegram-apps/sdk";

import { useAppDispatch } from "@hooks";
import { connectWallet, setOld } from "@/core/store/slices/user";
import { SPRING_OPTIONS, SWIPE_CONFIDEBCE_THRESHOLD } from "@config";
import {
  fortuneWheelImage,
  inviteImage,
  miningImage,
  onboardingAnimation,
  waletImage,
} from "@images";

import styles from "./Onboarding.module.scss";

const getgemsUrl = import.meta.env.VITE_GETGEMS_URL;

type SlideProps = {
  image?: string;
  video?: string;
  title: string;
  text: JSX.Element | string;
};

const Slide: FC<SlideProps> = ({ image, title, text, video }) => {
  const { t } = useTranslation("onboarding");

  return (
    <motion.div transition={SPRING_OPTIONS} className={styles.slide}>
      {image && <img className={styles.image} src={image} />}
      {video && (
        <video
          className={styles.image}
          src={video}
          autoPlay={true}
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          preload="auto"
        >
          <source src={video} type="video/mp4" data-wf-ignore="true" />
        </video>
      )}
      <h1 className={styles.title}>{t(title)}</h1>
      <p className={styles.text}>{text}</p>
    </motion.div>
  );
};

export const Onboarding = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const { t } = useTranslation("onboarding");
  const wallet = useTonWallet();
  const utils = initUtils();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const next = () => {
    setImgIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  };

  const byNft = () => {
    utils.openLink(getgemsUrl);
  };

  const SLIDES = [
    {
      video: onboardingAnimation,
      title: "earn-title",
      text: (
        <>
          {t("earn-text-1")}
          <span onClick={byNft} className={styles.link}>
            getgems.io
          </span>
          {t("earn-text-2")}
        </>
      ),
    },
    {
      image: miningImage,
      title: "mining-title",
      text: (
        <>
          {t("mining-text-1")}
          <strong>$LIKE</strong>
          {t("mining-text-2")}
        </>
      ),
    },
    {
      image: fortuneWheelImage,
      title: "fortune-wheel-title",
      text: t("fortune-wheel-text"),
    },
    {
      image: inviteImage,
      title: "invite-title",
      text: (
        <>
          {t("invite-text-1")}
          <strong>LOVE</strong>
          {t("invite-text-2")}
        </>
      ),
    },
    {
      image: waletImage,
      title: "walet-title",
      text: t("walet-text"),
    },
  ];

  useEffect(() => {
    if (wallet && imgIndex === SLIDES.length - 1) {
      dispatch(connectWallet({ wallet: wallet.account.address }));
      dispatch(setOld());
      navigate("/");
    }
  }, [wallet, imgIndex]);

  return (
    <div className={styles.container}>
      <AnimatePresence initial={false}>
        <motion.div
          drag="x"
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${imgIndex * 100}%`,
          }}
          transition={SPRING_OPTIONS}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (
              swipe < -SWIPE_CONFIDEBCE_THRESHOLD &&
              imgIndex < SLIDES.length - 1
            ) {
              setImgIndex((pv) => pv + 1);
            } else if (swipe > SWIPE_CONFIDEBCE_THRESHOLD && imgIndex > 0) {
              setImgIndex((pv) => pv - 1);
            }
          }}
          initial="enter"
          exit="exit"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          className={styles.swiper}
        >
          {SLIDES.map((slide, index) => (
            <Slide
              key={index}
              image={slide.image || undefined}
              video={slide.video || undefined}
              title={t(slide.title)}
              text={slide.text}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      {SLIDES.length === imgIndex + 1 ? (
        <TonConnectButton className={styles.walet} />
      ) : (
        <div className={styles.navigation}>
          <button className={styles.button} onClick={next}>
            {t("next")}
          </button>
          <div className={styles.dots}>
            {SLIDES.map((_, idx) => {
              return (
                <motion.span
                  key={idx}
                  className={styles.dot}
                  initial={{ opacity: 0.1 }}
                  animate={idx === imgIndex ? { opacity: 1 } : { opacity: 0.1 }}
                  transition={{ duration: 0.2, type: "tween" }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
