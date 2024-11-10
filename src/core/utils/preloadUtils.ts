const hash = import.meta.env.VITE_APP_BUILD_TIME;

const clearOldCaches = async (prefix: string) => {
  const cacheKeys = await caches.keys();
  const currentCacheVersion = `${prefix}-${hash}`;

  await Promise.all(
    cacheKeys
      .filter((key) => key.startsWith(prefix) && key !== currentCacheVersion)
      .map((oldCache) => caches.delete(oldCache))
  );
};

export const preloadUtils = {
  images: async (images: string[]) => {
    const cacheVersion = `image-cache-${hash}`;
    const cache = await caches.open(cacheVersion);

    await clearOldCaches("image-cache");

    images.forEach(async (image) => {
      const cachedResponse = await cache.match(image);

      if (!cachedResponse) {
        const img = new Image();
        img.src = image;

        img.onload = async () => {
          const response = await fetch(image);
          cache.put(image, response.clone());
        };
      }
    });
  },

  videos: async (videos: string[]) => {
    const cacheVersion = `video-cache-${hash}`;
    const cache = await caches.open(cacheVersion);

    await clearOldCaches("video-cache");

    videos.forEach(async (video) => {
      const cachedResponse = await cache.match(video);

      if (!cachedResponse) {
        const vid = document.createElement("video");
        vid.src = video;
        vid.preload = "auto";

        vid.onloadeddata = async () => {
          const response = await fetch(video);
          cache.put(video, response.clone());
        };

        vid.load();
      }
    });
  },
};
