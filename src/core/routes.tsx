import type { ComponentType, JSX } from "react";
import {
  OnboardingPage,
  MainPage,
  MinePage,
  FriendsPage,
  EarnPage,
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
];
