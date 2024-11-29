import type { ComponentType, JSX } from "react";

import {
  OnboardingPage,
  MainPage,
  MinePage,
  MineIndexPage,
  MineUpgradesPage,
  FriendsPage,
  EarnPage,
  WalletPage,
  WalletCard,
  HistoryPage,
  SettingsPage,
  WithdrawPage,
  TransferPage,
  FortunePage,
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
    props?: object;
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
  {
    path: "/wallet",
    Component: WalletPage,
    children: [
      { index: true, Component: WalletCard, props: { type: "silver" } },
      { path: "gold", Component: WalletCard, props: { type: "gold" } },
      { path: "platinum", Component: WalletCard, props: { type: "platinum" } },
    ],
  },
  { path: "/wallet/history", Component: HistoryPage },
  { path: "/wallet/withdraw", Component: WithdrawPage },
  { path: "/wallet/transfer", Component: TransferPage },
  { path: "/settings", Component: SettingsPage },
  { path: "/earn/fortune", Component: FortunePage },
];
