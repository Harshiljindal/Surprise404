// Maps for tracking loaded assets to avoid duplicate loading
const loadedAudio = new Map();
const loadedImages = new Map();

const audioFiles = [
  '/happy.mp3',
  '/error.mp3',
  '/success.mp3',
  '/src/pages/sounds/2.mp3',
  '/src/pages/sounds/error.mp3',
  '/src/pages/sounds/success.mp3'
];

export const preloadAudioAssets = () => {
  audioFiles.forEach(url => {
    // Skip if already loaded
    if (loadedAudio.has(url)) return;
    
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = url;
    
    // Mark as loaded
    loadedAudio.set(url, true);
  });
};

export const preloadImageAssets = () => {
  // Preload key images used in animations and transitions
  const criticalImages = [
    '/vite.svg', // Correct path for Firebase hosting
    // Add other critical images here
  ];
  
  criticalImages.forEach(src => {
    // Skip if already loaded
    if (loadedImages.has(src)) return;
    
    const img = new Image();
    img.src = src;
    
    // Mark as loaded
    loadedImages.set(src, true);
  });
    // Request idle callback to load less critical images when browser is idle
  if ('requestIdleCallback' in window) {
    // Define the type for requestIdleCallback to fix TypeScript error
    interface WindowWithRequestIdleCallback extends Window {
      requestIdleCallback: (
        callback: (deadline: {
          didTimeout: boolean;
          timeRemaining: () => number;
        }) => void,
        opts?: { timeout: number }
      ) => number;
    }
    
    // Cast window to the extended interface
    (window as WindowWithRequestIdleCallback).requestIdleCallback(() => {
      // Secondary images to load during idle time
      const secondaryImages: string[] = [
        // Add secondary images here
      ];
      
      secondaryImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    });
  }
};
