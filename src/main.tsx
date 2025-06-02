import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Preload critical fonts immediately
const preloadFonts = () => {
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
    'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap',
    'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap'
  ];
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'preload';
    link.as = 'style';
    document.head.appendChild(link);
    
    // Also add stylesheet
    const style = document.createElement('link');
    style.href = url;
    style.rel = 'stylesheet';
    document.head.appendChild(style);
  });
};

// Run font preloading immediately
preloadFonts();

// Use StrictMode only in development
const AppRoot = process.env.NODE_ENV === 'production' 
  ? <App />
  : <StrictMode><App /></StrictMode>;

createRoot(document.getElementById('root')!).render(AppRoot);
