/**
 * 이미지 캐싱을 위한 유틸리티 함수들
 */

// 이미지 URL 목록
export const IMAGE_URLS = [
  // Material images
  "/icons/1-1_LV.jpg",
  "/icons/1-2_VT.jpg", 
  "/icons/1-3_L.jpg",
  "/icons/1-4_J.jpg",
  "/icons/1-5_G.jpg",
  "/icons/2-1_VS.jpg",
  "/icons/2-2_MT.jpg",
  "/icons/2-3_NS.jpg",
  "/icons/2-4_S.jpg",
  "/icons/3-1_CS.jpg",
  "/icons/3-2_TS.jpg",
  "/icons/4_TI.jpg",
  "/icons/5-1_F.jpg",
  "/icons/5-2_ST.jpg",
  "/icons/5-3_PM.jpg",
  // Navigation icons
  "/icons/main1-1.svg",
  "/icons/main1-1-active.svg",
  "/icons/main2-2.svg",
  "/icons/main2-2-active.svg",
  "/icons/main3-3.svg",
  "/icons/main3-3-active.svg"
] as const;

// 우선순위 이미지 (먼저 로드할 이미지들)
export const PRIORITY_IMAGES = [
  "/icons/1-1_LV.jpg",
  "/icons/1-2_VT.jpg",
  "/icons/1-3_L.jpg",
  "/icons/main1-1.svg",
  "/icons/main1-1-active.svg",
  "/icons/main2-2.svg",
  "/icons/main2-2-active.svg",
  "/icons/main3-3.svg",
  "/icons/main3-3-active.svg"
] as const;

/**
 * 이미지를 브라우저 캐시에 저장
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * 여러 이미지를 병렬로 프리로드
 */
export const preloadImages = async (urls: readonly string[]): Promise<void> => {
  try {
    await Promise.allSettled(urls.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

/**
 * Service Worker를 통한 이미지 캐싱
 */
export const cacheImagesWithServiceWorker = async (urls: readonly string[]): Promise<void> => {
  if (!('serviceWorker' in navigator) || !('caches' in window)) {
    return;
  }

  try {
    const cache = await caches.open('image-cache-v1');
    
    // 이미 캐시된 이미지는 제외
    const uncachedUrls = [];
    for (const url of urls) {
      const cached = await cache.match(url);
      if (!cached) {
        uncachedUrls.push(url);
      }
    }

    if (uncachedUrls.length === 0) return;

    // 캐시되지 않은 이미지들을 fetch하여 캐시에 저장
    await Promise.allSettled(
      uncachedUrls.map(async (url) => {
        try {
          const response = await fetch(url, {
            cache: 'force-cache',
            mode: 'cors'
          });
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (error) {
          console.warn(`Failed to cache image: ${url}`, error);
        }
      })
    );
  } catch (error) {
    console.warn('Service Worker caching failed:', error);
  }
};

/**
 * 우선순위 기반 이미지 로딩
 */
export const loadImagesWithPriority = async (): Promise<void> => {
  // 1. 우선순위 이미지 먼저 로드
  await preloadImages(PRIORITY_IMAGES);
  
  // 2. 나머지 이미지들을 백그라운드에서 로드
  const remainingImages = IMAGE_URLS.filter(url => !PRIORITY_IMAGES.includes(url as any));
  
  // Service Worker 캐싱과 일반 프리로딩을 병렬로 실행
  await Promise.allSettled([
    cacheImagesWithServiceWorker(remainingImages),
    preloadImages(remainingImages)
  ]);
};

/**
 * 특정 이미지가 캐시에 있는지 확인
 */
export const isImageCached = async (url: string): Promise<boolean> => {
  if (!('caches' in window)) return false;
  
  try {
    const cache = await caches.open('image-cache-v1');
    const cached = await cache.match(url);
    return !!cached;
  } catch {
    return false;
  }
};

/**
 * 캐시 상태 확인 및 정리
 */
export const cleanupImageCache = async (): Promise<void> => {
  if (!('caches' in window)) return;
  
  try {
    const cacheNames = await caches.keys();
    const imageCacheNames = cacheNames.filter(name => name.startsWith('image-cache-'));
    
    // 오래된 캐시 삭제 (v1이 아닌 것들)
    const oldCaches = imageCacheNames.filter(name => name !== 'image-cache-v1');
    await Promise.allSettled(
      oldCaches.map(name => caches.delete(name))
    );
  } catch (error) {
    console.warn('Cache cleanup failed:', error);
  }
};
