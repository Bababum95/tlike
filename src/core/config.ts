import {
  fortuneLikeImage,
  fortuneLove2Image,
  fortuneLove3Image,
  fortuneLove4Image,
  fortuneLove5Image,
  fortuneLoveImage,
  fortuneNFTImage,
  fortuneNotcoinImage,
  fortuneToncoinImage,
  // slide1Image,
  slide2Image,
  slide3Image,
  slide4Image,
} from "@images";

export const SPRING_OPTIONS = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export const IMAGE_INITIAL_STATE = { y: -60, scale: 0.9, opacity: 0.7 };
export const SWIPE_CONFIDEBCE_THRESHOLD = 0.7;
export const AUTO_DELAY = 5000;

export const MAIN_SLIDER = [slide2Image, slide3Image, slide4Image];

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
