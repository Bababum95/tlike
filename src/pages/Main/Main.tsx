import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { Navigation, User, Balance, Link, Toast } from "@/components";
import { markNotificationsAsRead } from "@/core/store/slices/history";
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
  const { t } = useTranslation("common");
  const dragX = useMotionValue(0);
  const wallet = import.meta.env.DEV ? true : useTonWallet();
  const dispatch = useAppDispatch();
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
        <User showIcon />
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
        !!notifications.length && (
          <Toast
            isOpen={!!notifications[0]}
            onClose={() => dispatch(markNotificationsAsRead())}
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
                  stroke="url(#paint0_linear_1259_6835)"
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
                  d="M31.584 40.4561H52.416V51.3201L52.192 51.9361L51.968 52.2721L51.688 52.5521L51.408 52.7761L51.24 52.8881L50.792 53.0001H33.208L32.704 52.8321L32.368 52.6081L32.088 52.3281L31.864 52.0481L31.64 51.5441L31.584 51.3201V40.4561Z"
                  fill="white"
                />
                <path
                  d="M36.9599 25H38.3599L38.9759 25.168L39.5359 25.56L40.0399 26.176L40.4319 26.736L40.9359 27.632L41.2719 28.472L41.6639 29.76L41.8879 30.712L41.9999 31.552L42.0559 31.776L42.1679 30.824L42.5039 29.48L42.9519 28.136L43.4559 27.072L43.9599 26.288L44.4639 25.728L44.7439 25.392L45.2479 25.112L45.7519 25H47.1519L47.9919 25.112L48.8879 25.448L49.7279 25.952L50.3439 26.456L50.9039 27.072L51.2399 27.576L51.6879 28.64L51.7999 29.144V29.984L51.5759 30.824L51.1839 31.608L50.5119 32.392L49.8959 32.952L48.8879 33.624L47.9919 34.072L47.5999 34.24L46.8719 34.408L51.9679 34.464L52.5279 34.632L53.0879 35.024L53.4799 35.528L53.6479 36.032L53.7039 36.368V39.448H30.2959V36.368L30.4639 35.64L30.7999 35.136L31.1919 34.8L31.6399 34.576L32.0319 34.464L37.2399 34.408L36.1759 34.128L35.2799 33.68L34.4399 33.12L33.8799 32.672L33.1519 31.944L32.9839 31.664L32.8159 31.496L32.3679 30.432L32.3119 30.096V29.032L32.5919 28.136L32.9839 27.352L33.4319 26.792L34.0479 26.176L34.8879 25.616L35.7279 25.224L36.1199 25.112L36.9599 25ZM35.5039 27.632L35.6159 28.248L35.8959 29.088L36.3439 29.928L36.9039 30.712L37.5199 31.496L38.1919 32.112L38.4719 32.28L39.3679 32.952L39.8719 33.288H39.9839L39.8719 32.728L39.6479 32L38.9759 30.712L38.5279 30.04L38.0239 29.424L37.8559 29.256H37.7439L37.6879 29.088L37.4079 28.808L36.7359 28.248L35.8399 27.744L35.5039 27.632ZM48.4959 27.632L47.6559 28.08L46.9839 28.584L46.4239 29.088L45.8079 29.76L45.1919 30.656L44.5199 31.888L44.2399 32.672L44.1279 33.288L44.4079 33.176L45.5279 32.392L45.8079 32.168L46.3119 31.776L46.8159 31.272L47.0399 30.936L47.5999 30.208L48.0479 29.48L48.3839 28.696L48.6079 27.856V27.632H48.4959Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1259_6835"
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
              <p className={styles.hint}>{notifications[0].sender.user_id}</p>
              <p className={styles.amount}>
                {new Intl.NumberFormat("ru-RU", {
                  maximumFractionDigits: 0,
                }).format(notifications[0].receiver.received_amount)}{" "}
                {notifications[0].currency}
              </p>
              <button
                className={styles.claim}
                onClick={() => dispatch(markNotificationsAsRead())}
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
