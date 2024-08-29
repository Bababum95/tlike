import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import classNames from "classnames";

import { useAppSelector } from "@/core/hooks";
import { Navigation, User, Balance, Link, Toast } from "@/components";
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

export const Main = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const { t } = useTranslation("common");
  const dragX = useMotionValue(0);
  const wallet = import.meta.env.DEV ? true : useTonWallet();
  const user = useAppSelector((state) => state.user);
  const notifications = useAppSelector((state) => state.history.notifications);

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
    <div className={styles.container}>
      <header className={styles.header}>
        <User />
        <Link className={styles.wallet} to="/wallet">
          <WalletIcon />
          <span>{t("wallet")}</span>
        </Link>
        <Link className={styles.settings} to="/settings">
          <SettingIcon />
        </Link>
      </header>
      <video
        className={styles.miner}
        src={minerAnimation}
        autoPlay={user.mining_speed.tlove > 0 || user.mining_speed.tlike > 0}
        loop
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
        preload="auto"
        poster={
          user.mining_speed.tlove > 0 || user.mining_speed.tlike > 0
            ? ""
            : minerOffImage
        }
      >
        <source src={minerAnimation} type="video/mp4" data-wf-ignore="true" />
      </video>
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
      <Navigation />
      <Toast isOpen={!wallet}>
        <div className={classNames(styles.toast, styles["toast-wallet"])}>
          <svg
            width={84}
            height={78}
            viewBox="0 0 84 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.05994 20.0951L42 1.13771L76.9401 20.0951V57.9049L42 76.8623L7.05994 57.9049V20.0951Z"
              stroke="url(#paint0_linear_349_3199)"
              strokeWidth={2}
            />
            <path
              d="M12.2561 23.0982L42 7.13492L71.7439 23.0982V54.9018L42 70.8651L12.2561 54.9018V23.0982Z"
              fill="#1D60EC"
              fillOpacity="0.35"
              stroke="#007AFF"
              strokeWidth={2}
            />
            <g clipPath="url(#clip0_349_3199)">
              <path
                d="M51.1668 33.1667H50.0002V32C50.0002 31.0717 49.6314 30.1815 48.975 29.5251C48.3187 28.8687 47.4284 28.5 46.5002 28.5H34.8335C33.9052 28.5 33.015 28.8687 32.3586 29.5251C31.7022 30.1815 31.3335 31.0717 31.3335 32V46C31.3335 46.9283 31.7022 47.8185 32.3586 48.4749C33.015 49.1313 33.9052 49.5 34.8335 49.5H51.1668C52.0951 49.5 52.9853 49.1313 53.6417 48.4749C54.2981 47.8185 54.6668 46.9283 54.6668 46V36.6667C54.6668 35.7384 54.2981 34.8482 53.6417 34.1918C52.9853 33.5354 52.0951 33.1667 51.1668 33.1667ZM34.8335 30.8333H46.5002C46.8096 30.8333 47.1063 30.9562 47.3251 31.175C47.5439 31.3938 47.6668 31.6906 47.6668 32V33.1667H34.8335C34.5241 33.1667 34.2273 33.0437 34.0085 32.825C33.7897 32.6062 33.6668 32.3094 33.6668 32C33.6668 31.6906 33.7897 31.3938 34.0085 31.175C34.2273 30.9562 34.5241 30.8333 34.8335 30.8333ZM52.3335 42.5H51.1668C50.8574 42.5 50.5607 42.3771 50.3419 42.1583C50.1231 41.9395 50.0002 41.6428 50.0002 41.3333C50.0002 41.0239 50.1231 40.7272 50.3419 40.5084C50.5607 40.2896 50.8574 40.1667 51.1668 40.1667H52.3335V42.5ZM52.3335 37.8333H51.1668C50.2386 37.8333 49.3483 38.2021 48.692 38.8585C48.0356 39.5148 47.6668 40.4051 47.6668 41.3333C47.6668 42.2616 48.0356 43.1518 48.692 43.8082C49.3483 44.4646 50.2386 44.8333 51.1668 44.8333H52.3335V46C52.3335 46.3094 52.2106 46.6062 51.9918 46.825C51.773 47.0438 51.4762 47.1667 51.1668 47.1667H34.8335C34.5241 47.1667 34.2273 47.0438 34.0085 46.825C33.7897 46.6062 33.6668 46.3094 33.6668 46V35.3017C34.0416 35.4335 34.4362 35.5006 34.8335 35.5H51.1668C51.4762 35.5 51.773 35.6229 51.9918 35.8417C52.2106 36.0605 52.3335 36.3572 52.3335 36.6667V37.8333Z"
                fill="white"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_349_3199"
                x1="53.5"
                y1="-8.5855e-07"
                x2="38.5"
                y2={78}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#007AFF" stopOpacity={0} />
                <stop offset="0.45" stopColor="#007AFF" stopOpacity="0.15" />
                <stop offset={1} stopColor="#007AFF" stopOpacity="0.6" />
              </linearGradient>
              <clipPath id="clip0_349_3199">
                <rect
                  width={26}
                  height={28}
                  fill="white"
                  transform="translate(29.5 25)"
                />
              </clipPath>
            </defs>
          </svg>
          <h2 className={styles.title}>{t("connect-wallet")}</h2>
          <p className={styles.hint}>{t("connect-wallet-hint")}</p>
        </div>
      </Toast>
      {wallet ? (
        notifications[notificationIndex] && (
          <Toast
            isOpen={!!notifications[notificationIndex]}
            onClose={() => setNotificationIndex(notificationIndex + 1)}
          >
            <div className={styles.toast}>
              <svg
                width={84}
                height={78}
                viewBox="0 0 84 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.05994 20.0951L42 1.13771L76.9401 20.0951V57.9049L42 76.8623L7.05994 57.9049V20.0951Z"
                  stroke="url(#paint0_linear_216_13969)"
                  strokeWidth={2}
                />
                <path
                  d="M12.2561 23.0982L42 7.13492L71.7439 23.0982V54.9018L42 70.8651L12.2561 54.9018V23.0982Z"
                  fill="#1D60EC"
                  fillOpacity="0.35"
                  stroke="#007AFF"
                  strokeWidth={2}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M42.5 47.8754C41.9616 48.8747 41.9609 48.8742 41.9609 48.8742L41.9573 48.8724L41.9489 48.8682L41.92 48.8537C41.8955 48.8412 41.8605 48.8234 41.8158 48.8001C41.7263 48.7538 41.5977 48.686 41.4356 48.5979C41.1116 48.4217 40.6527 48.1634 40.1038 47.8302C39.0084 47.1654 37.5425 46.1953 36.0708 44.9775C33.1947 42.5971 30 39.0257 30 34.7501C30 30.7537 33.259 28 36.6406 28C39.0584 28 41.1764 29.2023 42.5 31.03C43.8236 29.2023 45.9416 28 48.3594 28C51.7409 28 55 30.7537 55 34.7501C55 39.0257 51.8053 42.5971 48.9292 44.9775C47.4575 46.1953 45.9916 47.1654 44.8962 47.8302C44.3473 48.1634 43.8884 48.4217 43.5644 48.5979C43.4023 48.686 43.2737 48.7538 43.1842 48.8001C43.1395 48.8234 43.1045 48.8412 43.08 48.8537L43.0511 48.8682L43.0427 48.8724L43.0391 48.8742C43.0391 48.8742 43.0384 48.8747 42.5 47.8754ZM42.5 47.8754L43.0391 48.8742C42.7014 49.0419 42.2986 49.0419 41.9609 48.8742L42.5 47.8754Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_216_13969"
                    x1="53.5"
                    y1="-8.5855e-07"
                    x2="38.5"
                    y2={78}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#007AFF" stopOpacity={0} />
                    <stop
                      offset="0.45"
                      stopColor="#007AFF"
                      stopOpacity="0.15"
                    />
                    <stop offset={1} stopColor="#007AFF" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
              <h2 className={styles.title}>{t("gift-from")}</h2>
              <p className={styles.hint}>
                {notifications[notificationIndex].sender.user_id}
              </p>
              <p className={styles.amount}>
                {new Intl.NumberFormat("ru-RU", {
                  maximumFractionDigits: 0,
                }).format(
                  notifications[notificationIndex].receiver.received_amount
                )}{" "}
                {notifications[notificationIndex].currency}
              </p>
              <button
                className={styles.claim}
                onClick={() => setNotificationIndex(notificationIndex + 1)}
              >
                {t("claim")}
              </button>
            </div>
          </Toast>
        )
      ) : (
        <TonConnectButton className={styles.walet} />
      )}
    </div>
  );
};
