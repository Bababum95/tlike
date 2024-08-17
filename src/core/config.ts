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
  },
  {
    value: "50 TON",
    icon: fortuneToncoinImage,
  },
  {
    value: "2000 LOVE",
    icon: fortuneLove3Image,
  },
  {
    value: "1 NFT",
    icon: fortuneNFTImage,
  },
  {
    value: "1500 LOVE",
    icon: fortuneLove2Image,
  },
  {
    value: "2000 NOT",
    icon: fortuneNotcoinImage,
  },
  {
    value: "5000 LOVE",
    icon: fortuneLove5Image,
  },
  {
    value: "500 LIKE",
    icon: fortuneLikeImage,
  },
  {
    value: "3000 LOVE",
    icon: fortuneLove4Image,
  },
];

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
