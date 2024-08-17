export const preloadUtils = {
  preloadImages: (images: string[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  },
};
