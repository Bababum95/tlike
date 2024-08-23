import type { ComponentType, JSX } from "react";
import {
  OnboardingPage,
  MainPage,
  MinePage,
  FriendsPage,
  EarnPage,
  WalletPage,
  HistoryPage,
  SettingsPage,
  WithdrawPage,
  TransferPage,
  FortunePage,
  ReferalPage,
} from "@/pages";
import { EarnIcon, FriendsIcon, MainIcon, MineIcon } from "@/assets/images";

type Route = {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
};

export const mainRoutes: Route[] = [
  { path: "/", Component: MainPage, icon: <MainIcon />, title: "main" },
  { path: "/mine", Component: MinePage, icon: <MineIcon />, title: "mine" },
  { path: "/earn", Component: EarnPage, icon: <EarnIcon />, title: "earn" },
  {
    path: "/friends",
    Component: FriendsPage,
    icon: <FriendsIcon />,
    title: "friends",
  },
];

export const routes: Route[] = [
  ...mainRoutes,
  { path: "/onboarding", Component: OnboardingPage },
  { path: "/referal", Component: ReferalPage },
  { path: "/wallet", Component: WalletPage },
  { path: "/wallet/history", Component: HistoryPage },
  { path: "/wallet/withdraw", Component: WithdrawPage },
  { path: "/wallet/transfer", Component: TransferPage },
  { path: "/settings", Component: SettingsPage },
  { path: "/earn/fortune", Component: FortunePage },
  { path: "/mine/:tab?", Component: MinePage },

];
