import {
  byNftImage,
  engineerImage,
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

export const TOKENS = [
  {
    name: "USDT",
    key: "usdt",
    icon: "/images/tokens/usdt.webp",
  },
  {
    name: "TON",
    key: "ton",
    icon: "/images/tokens/ton.webp",
  },
  {
    name: "Like",
    key: "like",
    icon: "/images/tokens/like.webp",
  },
  {
    name: "Love",
    key: "love",
    icon: "/images/tokens/love.webp",
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
    icon: "/images/tokens/love.webp",
    id: 1,
  },
  {
    value: "50 TON",
    icon: "/images/tokens/ton.webp",
    id: 9,
  },
  {
    value: "2000 LOVE",
    icon: "/images/tokens/love.webp",
    id: 3,
  },
  {
    value: "1 NFT",
    icon: "/images/nft-icon.webp",
    id: 8,
  },
  {
    value: "1500 LOVE",
    icon: "/images/tokens/love.webp",
    id: 2,
  },
  {
    value: "2000 NOT",
    icon: "/images/tokens/not.webp",
    id: 7,
  },
  {
    value: "5000 LOVE",
    icon: "/images/tokens/love.webp",
    id: 5,
  },
  {
    value: "500 LIKE",
    icon: "/images/tokens/like.webp",
    id: 6,
  },
  {
    value: "3000 LOVE",
    icon: "/images/tokens/love.webp",
    id: 4,
  },
];

export const PRELOAD_IMAGES_LIST = [
  slide1Image,
  slide2Image,
  slide3Image,
  slide4Image,
  minerOffImage,
  byNftImage,
  engineerImage,
  waterCoolingImage,
  fortuneWheelPreviewImage,
];

export const PRELOAD_VIDEOS_LIST = [minerAnimation, onboardingAnimation];

export const CARD_ADVANTAGES = [
  "conversion_fee",
  "usdt_fee",
  "ton_fee",
  "like_fee",
  "love_fee",
] as const;
