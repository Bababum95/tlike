import type { ComponentType, JSX } from "react";

import {
  OnboardingPage,
  MainPage,
  MinePage,
  MineIndexPage,
  MineUpgradesPage,
  FriendsPage,
  EarnPage,
  EarnCalendarPage,
  EarnFortunePage,
  EarnTasksPage,
  WalletPage,
  DepositPage,
  DepositStepOnePage,
  DepositStepTwoPage,
  HistoryPage,
  SettingsPage,
  WithdrawPage,
  TransferPage,
  ReferalPage,
} from "@/pages";
import { EarnIcon, FriendsIcon, MainIcon, MineIcon } from "@/assets/images";

export type Route = {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  children?: {
    path?: string;
    Component: ComponentType;
    index?: boolean;
  }[];
};

export const mainRoutes: Route[] = [
  { path: "/", Component: MainPage, icon: <MainIcon />, title: "main" },
  {
    path: "/mine",
    Component: MinePage,
    icon: <MineIcon />,
    title: "mine",
    children: [
      { index: true, Component: MineIndexPage },
      { path: "upgrades", Component: MineUpgradesPage },
    ],
  },
  {
    path: "/earn",
    Component: EarnPage,
    icon: <EarnIcon />,
    title: "earn",
    children: [
      { index: true, Component: EarnTasksPage },
      { path: "fortune", Component: EarnFortunePage },
      { path: "calendar", Component: EarnCalendarPage },
    ],
  },
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
  {
    path: "/wallet/deposit",
    Component: DepositPage,
    children: [
      { index: true, Component: DepositStepOnePage },
      { path: "step-two", Component: DepositStepTwoPage },
    ],
  },
  { path: "/settings", Component: SettingsPage },
];
