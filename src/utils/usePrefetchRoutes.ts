import { useEffect } from 'react';

// Function to get the correct import based on route name
const getRouteModule = (routeName: string) => {
  switch(routeName) {
    case 'Home':
      return import('../pages/Home');
    case 'CosmicBlessing':
      return import('../pages/CosmicBlessing');
    case 'ShareStory':
      return import('../pages/ShareStory');
    case 'Game':
      return import('../pages/Game');
    default:
      return Promise.reject(new Error(`Unknown route: ${routeName}`));
  }
};

// List of paths to prefetch
const ROUTES_TO_PREFETCH = [
  'Home',
  'CosmicBlessing', 
  'ShareStory',
  'Game'
];

// PrefetchProvider component to prefetch routes in background
const usePrefetchRoutes = () => {
  useEffect(() => {
    // Wait until browser is idle to prefetch
    if ('requestIdleCallback' in window) {
      // @ts-ignore - TypeScript doesn't have proper types for requestIdleCallback
      window.requestIdleCallback(() => {
        ROUTES_TO_PREFETCH.forEach(route => {
          try {
            getRouteModule(route).catch(() => {
              // Silent catch - we're just prefetching
            });
          } catch (e) {
            // Ignore errors during prefetching
          }
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        ROUTES_TO_PREFETCH.forEach(route => {
          try {
            getRouteModule(route).catch(() => {
              // Silent catch - we're just prefetching
            });
          } catch (e) {
            // Ignore errors during prefetching
          }
        });
      }, 2000); // Wait 2 seconds before prefetching
    }
  }, []);
};

export default usePrefetchRoutes;
