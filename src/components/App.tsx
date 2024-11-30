import { type FC, useEffect, useState, useCallback } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, HashRouter } from "react-router-dom";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";
import {
  useLaunchParams,
  initData,
  backButton,
} from "@telegram-apps/sdk-react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { PRELOAD_IMAGES_LIST, PRELOAD_VIDEOS_LIST } from "@config";
import { Loader, Notice, AppRoutes } from "@/components";
import { mainRoutes } from "@/core/routes";
import { getStatus as getCardStatus } from "@/core/store/slices/card";
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

const isProd: boolean = import.meta.env.PROD;

/**
 * Main application component handling initialization and state management.
 *
 * @component
 * @returns {JSX.Element} The App component managing routing and loading state.
 */
export const App: FC = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(20);
  const { i18n } = useTranslation();
  const lp = useLaunchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  /**
   * Checks if the current route is a main route and controls the visibility of the back button.
   */
  const updateBackButton = useCallback((): void => {
    const isMainRoute =
      mainRoutes.some((route) => route.path === location.pathname) ||
      location.pathname === "/onboarding";
    isMainRoute ? backButton.hide() : backButton.show();
  }, [location.pathname]);

  useEffect(updateBackButton, [location.pathname, updateBackButton]);

  /**
   * Initializes user data on app startup.
   */
  useEffect(() => {
    if (initData && user.status === "idle") {
      setProgress(40);

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
  }, [initData, dispatch, user.status]);

  /**
   * Handles user status changes and data loading.
   */
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
        dispatch(getCardStatus()),
      ]).finally(() => setProgress(100));

      dispatch(getCommission());
      i18n.changeLanguage(user.language);
    } else if (user.status === "failed") {
      dispatch(setNotice({ status: "error", message: user.error }));
    }
  }, [user.status, dispatch, tonConnectUI, wallet, i18n]);

  /**
   * Starts a loop to add balance to the user based on mining speed.
   */
  useEffect(() => {
    if (
      !user.mining_speed.like &&
      !user.mining_speed.love_nft &&
      !user.mining_speed.love_upgrades
    )
      return;

    const miningLoop = setInterval(() => {
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

    return () => clearInterval(miningLoop);
  }, [user.mining_speed, dispatch]);

  /**
   * Connects the user's wallet once the app is fully loaded.
   */
  useEffect(() => {
    if (!wallet || progress !== 100) return;

    if (user.wallet !== wallet?.account.address) {
      dispatch(connectWallet({ wallet: wallet.account.address }));
    }
  }, [wallet, progress, user.wallet, dispatch]);

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
          <HashRouter>
            <AppRoutes />
            {user.referal && <Navigate to="/referal" replace />}
            {!user.referal && user.type === "new" && (
              <Navigate to="/onboarding" replace />
            )}
          </HashRouter>
        </>
      )}
    </AppRoot>
  );
};
