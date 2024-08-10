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
} from "@/pages";
import { EarnIcon, FriendsIcon, MainIcon, MineIcon } from "@/assets/images";

type Route = {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
};

export const mainRoutes: Route[] = [
  { path: "/", Component: MainPage, icon: <MainIcon />, title: "Main" },
  { path: "/mine", Component: MinePage, icon: <MineIcon />, title: "Mine" },
  { path: "/earn", Component: EarnPage, icon: <EarnIcon />, title: "Earn" },
  {
    path: "/friends",
    Component: FriendsPage,
    icon: <FriendsIcon />,
    title: "Friends",
  },
];

export const routes: Route[] = [
  ...mainRoutes,
  { path: "/onboarding", Component: OnboardingPage },
  { path: "/wallet", Component: WalletPage },
  { path: "/wallet/history", Component: HistoryPage },
  { path: "/wallet/withdraw", Component: WithdrawPage },
  { path: "/wallet/transfer", Component: TransferPage },
  { path: "/settings", Component: SettingsPage },
  { path: "/earn/fortune", Component: FortunePage },
];
