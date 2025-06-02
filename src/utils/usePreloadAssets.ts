// Preload most of the heavy assets once when app loads
import { useEffect, useRef } from 'react';

import { preloadAudioAssets, preloadImageAssets } from './preloadAssets';

export const usePreloadAssets = () => {
  const loaded = useRef(false);

  useEffect(() => {
    // Only run the preloading logic once
    if (loaded.current) return;
    loaded.current = true;

    // Start image and audio preloading in parallel
    preloadAudioAssets();
    preloadImageAssets();

    // Critical path preloading - immediate
    const criticalPagesToPreload = [
      '/pages/Home',
      '/pages/Login'
    ];
    
    // Start importing critical pages right away
    criticalPagesToPreload.forEach(page => {
      import(`../..${page}`).catch(() => {
        // Silent catch - just preloading
      });
    });
    
    // Secondary path preloading - during idle time
    const secondaryPagesToPreload = [
      '/pages/CosmicBlessing',
      '/pages/ShareStory',
      '/pages/Game'
    ];
    
    // Use requestIdleCallback for less critical pages to avoid blocking
    if ('requestIdleCallback' in window) {
      // @ts-ignore - TypeScript doesn't have types for requestIdleCallback
      window.requestIdleCallback(() => {
        secondaryPagesToPreload.forEach(page => {
          import(`../..${page}`).catch(() => {
            // Silent catch - just preloading
          });
        });
      }, { timeout: 5000 }); // 5s timeout to ensure it runs eventually
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        secondaryPagesToPreload.forEach(page => {
          import(`../..${page}`).catch(() => {
            // Silent catch - just preloading
          });
        });
      }, 1000); // 1s delay before loading secondary pages
    }
    
    // Debug info in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Assets preloading started');
    }
    
  }, []);
};
