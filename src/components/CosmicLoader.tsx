import styled, { keyframes } from 'styled-components';
import { memo, useMemo } from 'react';

// Memoize animations for performance
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #1a1a2e 0%, #000000 100%);
  z-index: 9999;
`;

const CosmicRing = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  will-change: transform;

  &::before, &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 4px solid transparent;
    animation: ${spin} 2s linear infinite;
  }

  &::before {
    border-top-color: #00dfff;
    border-right-color: #a020f0;
  }

  &::after {
    border-bottom-color: #ffd700;
    border-left-color: #ff1493;
    animation-duration: 1.5s;
    animation-direction: reverse;
  }
`;

const LoadingText = styled.div`
  position: absolute;
  font-family: 'Arial', sans-serif;
  font-size: 1.2rem;
  color: white;
  margin-top: 160px;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

// Predefined star positions for better performance
const STAR_POSITIONS = Array.from({ length: 30 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  size: Math.random() * 2 + 1
}));

const Star = styled.div<{top: string, left: string, delay: string, size: number}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top};
  left: ${props => props.left};
  background: white;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  will-change: opacity, transform;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px white;
  }
`;

// Memoized component to prevent unnecessary re-renders
const CosmicLoader = memo(() => {
  // Memoize stars to prevent recalculation
  const stars = useMemo(() => 
    STAR_POSITIONS.map((pos, i) => (
      <Star
        key={i}
        top={pos.top}
        left={pos.left}
        delay={pos.delay}
        size={pos.size}
      />
    )), 
  []);
  return (
    <LoaderContainer>
      {stars}
      <CosmicRing />
      <LoadingText>Loading Cosmic Experience...</LoadingText>
    </LoaderContainer>
  );
});

export default CosmicLoader;
