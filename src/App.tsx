import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Suspense, lazy, useState, useEffect } from 'react';
import CosmicLoader from './components/CosmicLoader';
import { usePreloadAssets } from './utils/usePreloadAssets';
import usePrefetchRoutes from './utils/usePrefetchRoutes';

// Import critical core pages eagerly (no lazy loading)

import Login from './pages/Login';

// Lazy load pages with different priorities
// Higher priority pages - loaded almost immediately
const Home = lazy(() => {
  return import(/* webpackPrefetch: true, webpackChunkName: "home" */ './pages/Home');
});

// Medium priority - prefetched but not as critical
const CosmicBlessing = lazy(() => {
  return import(/* webpackPrefetch: true, webpackChunkName: "cosmic" */ './pages/CosmicBlessing');
});

// Lower priority pages - only loaded when needed
const ShareStory = lazy(() => {
  return import(/* webpackChunkName: "share" */ './pages/ShareStory');
});

const Game = lazy(() => {
  return import(/* webpackChunkName: "game" */ './pages/Game');
});

// Preload font to avoid layout shifts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Indie+Flower&family=Great+Vibes&display=swap&display=block');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use our custom hooks to preload assets and prefetch routes
  usePreloadAssets();
  usePrefetchRoutes();

  // Show initial loader for a set time to ensure assets are loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Slightly shorter initial load time
    
    return () => clearTimeout(timer);
  }, []);
  // If initial loading state, show cosmic loader
  if (isLoading) {
    return <CosmicLoader />;
  }

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* No Suspense for these critical paths */}
        
        <Route path="/login" element={<Login />} /> 
        
        {/* Use Suspense for these less critical paths */}
        <Route path="/home" element={
          <Suspense fallback={<CosmicLoader />}>
            <Home />
          </Suspense>
        } />
        <Route path="/game" element={
          <Suspense fallback={<CosmicLoader />}>
            <Game />
          </Suspense>
        } />
        <Route path="/cosmic" element={
          <Suspense fallback={<CosmicLoader />}>
            <CosmicBlessing />
          </Suspense>
        } />
        <Route path="/share-story" element={
          <Suspense fallback={<CosmicLoader />}>
            <ShareStory />
          </Suspense>
        } />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
