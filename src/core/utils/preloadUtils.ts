const hash: string = import.meta.env.VITE_APP_BUILD_TIME;

/**
 * Clears old caches that do not match the current cache version.
 *
 * @param {string} prefix - The prefix for the cache keys to be cleared.
 */
const clearOldCaches = async (prefix: string): Promise<void> => {
  const cacheKeys = await caches.keys();
  const currentCacheVersion = `${prefix}-${hash}`;

  await Promise.all(
    cacheKeys
      .filter((key) => key.startsWith(prefix) && key !== currentCacheVersion)
      .map((oldCache) => caches.delete(oldCache))
  );
};

export const preloadUtils = {
  /**
   * Preloads images and stores them in the cache if not already cached.
   *
   * @param {string[]} images - An array of image URLs to be preloaded.
   * @returns {Promise<void>} - A promise that resolves when all images are preloaded.
   */
  images: async (images: string[]): Promise<void> => {
    const cacheVersion = `image-cache-${hash}`;
    const cache = await caches.open(cacheVersion);

    // Clear old caches
    await clearOldCaches("image-cache");

    for (const image of images) {
      try {
        const cachedResponse = await cache.match(image);
        if (!cachedResponse) {
          const response = await fetch(image);
          if (response.ok) {
            await cache.put(image, response.clone());
          }
        }
      } catch (error) {
        console.error(`Failed to preload image ${image}:`, error);
      }
    }
  },

  /**
   * Preloads videos and stores them in the cache if not already cached.
   *
   * @param {string[]} videos - An array of video URLs to be preloaded.
   * @returns {Promise<void>} - A promise that resolves when all videos are preloaded.
   */
  videos: async (videos: string[]): Promise<void> => {
    const cacheVersion = `video-cache-${hash}`;
    const cache = await caches.open(cacheVersion);

    // Clear old caches
    await clearOldCaches("video-cache");

    for (const video of videos) {
      try {
        const cachedResponse = await cache.match(video);
        if (!cachedResponse) {
          const response = await fetch(video);
          if (response.ok) {
            await cache.put(video, response.clone());
          }
        }
      } catch (error) {
        console.error(`Failed to preload video ${video}:`, error);
      }
    }
  },
};
