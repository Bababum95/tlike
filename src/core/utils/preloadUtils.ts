export const preloadUtils = {
  images: (images: string[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  },
  videos: (videos: string[]) => {
    videos.forEach((video) => {
      const vid = document.createElement("video");
      vid.src = video;
      vid.load();
    });
  },
};
