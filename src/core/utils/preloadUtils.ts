export const preloadUtils = {
  images: (images: string[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  },
};
