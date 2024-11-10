import { type FC, useEffect, useState } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Outlet, Navigate } from "react-router-dom";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";
import {
  useLaunchParams,
  initData,
  backButton,
} from "@telegram-apps/sdk-react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { PRELOAD_IMAGES_LIST, PRELOAD_VIDEOS_LIST } from "@config";
import { Loader, Notice } from "@/components";
import { mainRoutes } from "@/core/routes";
import {
  addBalance,
  connectWallet,
  fetchReferral,
  fetchUser,
  getInventory,
  getMissions,
  getNFT,
  referralStat,
} from "@/core/store/slices/user";
import { setNotice } from "@/core/store/slices/notice";
import { checkTime } from "@/core/store/slices/fortune";
import { preloadUtils } from "@/core/utils/preloadUtils";
import { getCommission, getProjectStat } from "@/core/store/slices/project";
import { getNotifications } from "@/core/store/slices/history";

const isProd = import.meta.env.PROD;

export const App: FC = () => {
  const [progress, setProgress] = useState(20);
  const { i18n } = useTranslation();
  const lp = useLaunchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    let isMain = false;
    mainRoutes.forEach((route) => {
      if (route.path === location.pathname) isMain = true;
    });

    if (location.pathname === "/onboarding") isMain = true;

    if (isMain) backButton.hide();
    else backButton.show();
  }, [location]);

  useEffect(() => {
    if (initData && user.status === "idle") {
      setTimeout(() => {
        setProgress(40);
      }, 300);

      dispatch(
        fetchUser({
          initData: {
            user: initData.user(),
            queryId: initData.queryId(),
            hash: initData.hash(),
            authDate: initData.authDate(),
            startParam: initData.startParam(),
          },
        })
      );
      if (isProd) {
        preloadUtils.images(PRELOAD_IMAGES_LIST);
        preloadUtils.videos(PRELOAD_VIDEOS_LIST);
      }
    }
  }, [initData]);

  useEffect(() => {
    if (user.status === "successed") {
      setProgress(70);
      if (!user.wallet && wallet) {
        tonConnectUI.disconnect();
      }

      Promise.all([
        dispatch(checkTime()),
        dispatch(fetchReferral()),
        dispatch(getNFT()),
        dispatch(getInventory()),
        dispatch(getMissions()),
        dispatch(getProjectStat()),
        dispatch(referralStat()),
        dispatch(getNotifications()),
      ]).finally(() => {
        setProgress(99);
        setTimeout(() => {
          setProgress(100);
        }, 400);
      });

      dispatch(getCommission());
      i18n.changeLanguage(user.language);
    } else if (user.status === "failed") {
      dispatch(setNotice({ status: "error", message: user.error }));
    }
  }, [user.status]);

  useEffect(() => {
    if (
      !user.mining_speed.like &&
      !user.mining_speed.love_nft &&
      !user.mining_speed.love_upgrades
    )
      return;
    const loop = setInterval(() => {
      if (user.mining_speed.like) {
        dispatch(
          addBalance({ amount: user.mining_speed.like, currency: "Like" })
        );
      }

      if (user.mining_speed.love_nft || user.mining_speed.love_upgrades) {
        dispatch(
          addBalance({
            amount:
              user.mining_speed.love_nft + user.mining_speed.love_upgrades,
            currency: "Love",
          })
        );
      }
    }, 1000);

    return () => clearInterval(loop);
  }, [user.mining_speed]);

  useEffect(() => {
    if (!wallet || progress !== 100) return;

    if (user.wallet !== wallet?.account.address) {
      dispatch(connectWallet({ wallet: wallet.account.address }));
    }
  }, [wallet]);

  return (
    <AppRoot
      appearance="dark"
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      className="app"
    >
      <Notice />
      {progress !== 100 && isProd ? (
        <Loader progress={progress} />
      ) : (
        <>
          <Outlet />
          {user.referal ? (
            <Navigate to="/referal" replace />
          ) : (
            user.type === "new" && <Navigate to="/onboarding" replace />
          )}
        </>
      )}
    </AppRoot>
  );
};
