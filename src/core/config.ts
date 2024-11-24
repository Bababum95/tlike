import {
  byNftImage,
  cableImprovementsImage,
  engineerImage,
  fanImage,
  fortuneLikeImage,
  fortuneLove2Image,
  fortuneLove3Image,
  fortuneLove4Image,
  fortuneLove5Image,
  fortuneLoveImage,
  fortuneNFTImage,
  fortuneNotcoinImage,
  fortuneToncoinImage,
  fortuneWheelPreviewImage,
  minerAnimation,
  minerOffImage,
  onboardingAnimation,
  slide1Image,
  slide2Image,
  slide3Image,
  slide4Image,
  waterCoolingImage,
} from "@images";

export const BALANCES = [
  {
    name: "USDT",
    key: "usdt",
    icon: "/images/currency/usdt.webp",
  },
  {
    name: "TON",
    key: "ton",
    icon: "/images/currency/ton.webp",
  },
  {
    name: "Like",
    key: "like",
    icon: "/images/currency/like.webp",
  },
  {
    name: "Love",
    key: "love",
    icon: "/images/currency/love.webp",
  },
] as const;

export const SPRING_OPTIONS = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export const IMAGE_INITIAL_STATE = { y: -60, scale: 0.9, opacity: 0.7 };
export const SWIPE_CONFIDEBCE_THRESHOLD = 0.7;
export const AUTO_DELAY = 5000;

export const MAIN_SLIDER = [
  { image: slide1Image, link: "/settings/#active-users" },
  { image: slide2Image, link: "/earn" },
  {
    image: slide3Image,
    link: "https://getgems.io/collection/EQDMvchkiDT6H2ufjqCecyLb6-S9YYE1-JzSC7D-AbJfee2g",
  },
  { image: slide4Image, link: "/mine/upgrades" },
];

export const FORTUNE_WHEEL = [
  {
    value: "1000 LOVE",
    icon: fortuneLoveImage,
    id: 1,
  },
  {
    value: "50 TON",
    icon: fortuneToncoinImage,
    id: 9,
  },
  {
    value: "2000 LOVE",
    icon: fortuneLove3Image,
    id: 3,
  },
  {
    value: "1 NFT",
    icon: fortuneNFTImage,
    id: 8,
  },
  {
    value: "1500 LOVE",
    icon: fortuneLove2Image,
    id: 2,
  },
  {
    value: "2000 NOT",
    icon: fortuneNotcoinImage,
    id: 7,
  },
  {
    value: "5000 LOVE",
    icon: fortuneLove5Image,
    id: 5,
  },
  {
    value: "500 LIKE",
    icon: fortuneLikeImage,
    id: 6,
  },
  {
    value: "3000 LOVE",
    icon: fortuneLove4Image,
    id: 4,
  },
];

export const UPGRADES = {
  1: {
    name: "fan",
    image: fanImage,
  },
  2: {
    name: "cable-improvements",
    image: cableImprovementsImage,
  },
  3: {
    name: "water-cooling",
    image: waterCoolingImage,
  },
  4: {
    name: "engineer",
    image: engineerImage,
  },
};

export const PRELOAD_IMAGES_LIST = [
  fortuneLikeImage,
  fortuneLove2Image,
  fortuneLove3Image,
  fortuneLove4Image,
  fortuneLove5Image,
  fortuneLoveImage,
  fortuneNFTImage,
  fortuneNotcoinImage,
  fortuneToncoinImage,
  slide1Image,
  slide2Image,
  slide3Image,
  slide4Image,
  minerOffImage,
  byNftImage,
  cableImprovementsImage,
  engineerImage,
  fanImage,
  waterCoolingImage,
  fortuneWheelPreviewImage,
];

export const PRELOAD_VIDEOS_LIST = [minerAnimation, onboardingAnimation];
