import { type FC, useEffect, useMemo, useState } from "react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { useTonWallet } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  initInitData,
  initBackButton,
} from "@telegram-apps/sdk-react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { PRELOAD_IMAGES_LIST, PRELOAD_VIDEOS_LIST } from "@config";
import { Loader, Notice } from "@/components";
import { mainRoutes, routes } from "@/core/routes";
import {
  fetchReferral,
  fetchUser,
  getInventory,
  getMissions,
  getNFT,
  setWallet,
} from "@/core/store/slices/user";
import { setNotice } from "@/core/store/slices/notice";
import { checkTime } from "@/core/store/slices/fortune";
import { preloadUtils } from "@/core/utils/preloadUtils";
import { getProjectStat } from "@/core/store/slices/project";

const debug = import.meta.env.VITE_APP_DEBUG === "true";

export const App: FC = () => {
  const [progress, setProgress] = useState(20);
  const { i18n } = useTranslation();
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const initData = initInitData();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const wallet = useTonWallet();
  const [backButton] = initBackButton();

  useEffect(() => {
    miniApp.setBgColor("#1d2733");
    miniApp.setHeaderColor("#1d2733");
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    viewport?.expand();
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  useEffect(() => {
    let isMain = false;
    mainRoutes.forEach((route) => {
      if (route.path === location.pathname) {
        isMain = true;
      }
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

      dispatch(fetchUser(initData));
      preloadUtils.images(PRELOAD_IMAGES_LIST);
      preloadUtils.videos(PRELOAD_VIDEOS_LIST);
    }
  }, [initData]);

  useEffect(() => {
    if (user.status === "successed") {
      setProgress(70);
      Promise.all([
        dispatch(checkTime()),
        dispatch(fetchReferral()),
        dispatch(getNFT()),
        dispatch(getInventory()),
        dispatch(getMissions()),
        dispatch(getProjectStat()),
      ]).finally(() => {
        setProgress(99);
        setTimeout(() => {
          setProgress(100);
        }, 400);
      });
      i18n.changeLanguage(user.language);
      if (wallet) {
        dispatch(setWallet(wallet.account.address));
      }
    } else if (user.status === "failed") {
      dispatch(setNotice({ status: "error", message: user.error }));
    }
  }, [user.status]);

  return (
    <AppRoot
      appearance="dark"
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      className="app"
    >
      <Notice />
      {progress !== 100 && !debug ? (
        <Loader progress={progress} />
      ) : (
        <Router location={location} navigator={reactNavigator}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {user.referal && <Navigate to="/referal" replace />}
          {user.type === "new" && <Navigate to="/onboarding" replace />}
        </Router>
      )}
    </AppRoot>
  );
};
