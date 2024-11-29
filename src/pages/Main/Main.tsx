import { useTranslation } from "react-i18next";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { Navigation, Balance, Toast } from "@/components";
import { markNotificationsAsRead } from "@/core/store/slices/history";
import {
  minerAnimation,
  minerOffImage,
  ConnectWalletIcon,
  GiftIcon,
} from "@images";

import { Header } from "./Header";
import { Slider } from "./Slider";
import styles from "./Main.module.scss";

const isProd = import.meta.env.PROD;

export const Main = () => {
  const { t } = useTranslation("common");
  const wallet = useTonWallet();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const notifications = useAppSelector((state) => state.history.notifications);

  return (
    <div className={styles.container}>
      <Header />
      <video
        className={styles.miner}
        src={minerAnimation}
        autoPlay={user.mining_speed.like > 0}
        loop
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
        preload="auto"
        poster={user.mining_speed.like > 0 ? "" : minerOffImage}
      >
        <source src={minerAnimation} type="video/mp4" data-wf-ignore="true" />
      </video>
      <div className={styles.balance}>
        <Balance />
      </div>
      <Slider />
      <Navigation />
      <Toast isOpen={!wallet && isProd}>
        <div className={classNames(styles.toast, styles["toast-wallet"])}>
          <ConnectWalletIcon />
          <h2 className={styles.title}>{t("connect-wallet")}</h2>
          <p className={styles.hint}>{t("connect-wallet-hint")}</p>
        </div>
      </Toast>
      {wallet
        ? !!notifications.length && (
            <Toast
              isOpen={true}
              onClose={() => dispatch(markNotificationsAsRead())}
            >
              <div className={styles.toast}>
                <GiftIcon />
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
        : isProd && <TonConnectButton className={styles.walet} />}
    </div>
  );
};
