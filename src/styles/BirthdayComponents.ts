import styled, { keyframes } from 'styled-components';
import { bounce } from './animations';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const sway = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const wave = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(-15%); }
  50% { transform: translateY(0); }
  75% { transform: translateY(15%); }
  100% { transform: translateY(0); }
`;

// Removed unused spin animation

// Removed unused unwrap animation

// Removed unused heartBeat animation

// Unwrap animation for gift boxes
const unwrapAnimation = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.2) rotate(5deg); }
  60% { transform: scale(0.9) rotate(-5deg); }
  100% { transform: scale(1.1) rotate(0deg); }
`;

// Components
export const FloatingBalloon = styled.div<{
  color: string;
  left: string;
  delay: number;
  size: number;
}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 1.2}px;
  background-color: ${props => props.color};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  top: -${props => props.size / 2}px;
  left: ${props => props.left};
  animation: ${float} ${props => 8 + props.delay}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  transform-origin: center bottom;
  z-index: 1;
  opacity: 0.8;
  box-shadow: inset -10px -10px 20px rgba(0,0,0,0.2);
  
  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: ${props => props.size * 0.8}px;
    background-color: rgba(255, 255, 255, 0.7);
    bottom: -${props => props.size * 0.8}px;
    left: 50%;
    transform-origin: top center;
    animation: ${sway} ${props => 5 + props.delay / 2}s ease-in-out infinite;
    animation-delay: ${props => props.delay / 2}s;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 20%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    top: 20%;
    left: 15%;
    transform: rotate(30deg);
    filter: blur(3px);
  }
`;

// Animation for gift box unwrapping, removed duplicate

export const GiftBoxLid = styled.div<{ color: string; isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 8px 8px 0 0;
  top: -18px;
  left: 0;
  transform-origin: bottom;
  transform: ${props => props.isOpen ? 'rotateX(-160deg) translateZ(10px)' : 'rotateX(0)'};
  transition: transform 0.4s ease-in-out;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 15px;
    background: linear-gradient(to bottom, #fff, #ffd700);
    clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 8px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.8) 0%, 
      rgba(255, 255, 255, 0.4) 40%,
      rgba(255, 255, 255, 0.8) 100%
    );
    border-radius: 50%;
    filter: blur(2px);
  }
`;

export const GiftBoxContent = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 80%;
  height: 20px;
  top: 10px;
  left: 10%;
  transform: ${props => props.isOpen ? 'translateY(-30px) scale(1.2)' : 'translateY(0) scale(0)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.4s ease-in-out 0.2s;
  
  svg {
    color: #ff9a9e;
    font-size: 20px;
    filter: drop-shadow(0 0 5px rgba(255, 154, 158, 0.8));
    animation: ${bounce} 1s ease-in-out infinite;
  }
`;

export const GiftBox = styled.div<{ color: string; isOpen: boolean }>`
  position: relative;
  width: 60px;
  height: 60px;
  background-color: ${props => props.color};
  border-radius: 8px;  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  animation: ${props => props.isOpen ? unwrapAnimation : pulse} ${props => props.isOpen ? '1s' : '3s'} ${props => props.isOpen ? 'ease-out' : 'ease-in-out'} ${props => props.isOpen ? 'forwards' : 'infinite'};
  transform-style: preserve-3d;
  margin: 0 10px;
  perspective: 600px;
  transform: ${props => props.isOpen ? 'scale(1.1)' : 'scale(1)'};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 8px;
    height: 100%;
    background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4)
    );
    transform: translateX(-50%);
    border-radius: 4px;
    opacity: 0.7;
  }
  
  &:hover {
    transform: ${props => props.isOpen ? 'scale(1.1)' : 'scale(1.05) rotate(2deg)'};
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

export const WishesButton = styled.button`
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(254, 207, 239, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(254, 207, 239, 0.6);
  }
`;

export const PhotoButton = styled.button`
  background: linear-gradient(45deg, #a1c4fd, #c2e9fb);
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(162, 196, 253, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(162, 196, 253, 0.6);
  }
`;

export const CountdownTimer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 14px;
  color: white;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  
  &::before {
    content: 'Next birthday in:';
    font-size: 12px;
    margin-bottom: 5px;
    opacity: 0.8;
  }
`;

// Sparkle particles
const sparkle = keyframes`
  0%, 100% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1); opacity: 0.8; }
`;

export const ParticleEffect = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.8) 2px, transparent 3px),
      radial-gradient(circle at 80% 40%, rgba(255, 236, 210, 0.7) 2px, transparent 3px),
      radial-gradient(circle at 10% 60%, rgba(255, 154, 158, 0.7) 2px, transparent 3px),
      radial-gradient(circle at 70% 80%, rgba(161, 196, 253, 0.7) 2px, transparent 3px),
      radial-gradient(circle at 40% 30%, rgba(255, 236, 210, 0.6) 2px, transparent 3px),
      radial-gradient(circle at 90% 50%, rgba(255, 154, 158, 0.6) 2px, transparent 3px);
    animation: ${sparkle} 4s ease-in-out infinite;
    opacity: 0.3;
    filter: blur(1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.6) 1px, transparent 2px),
      radial-gradient(circle at 30% 70%, rgba(255, 236, 210, 0.5) 1px, transparent 2px),
      radial-gradient(circle at 60% 30%, rgba(255, 154, 158, 0.5) 1px, transparent 2px),
      radial-gradient(circle at 20% 60%, rgba(161, 196, 253, 0.5) 1px, transparent 2px);
    animation: ${sparkle} 3s ease-in-out infinite 1.5s;
    opacity: 0.2;
    filter: blur(1px);
  }
`;

// This is a placeholder for the HeartBurst component
// The actual component has been moved to a separate React component file
export const HeartBurstWrapper = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  width: 1px;
  height: 1px;
  z-index: 20;
  pointer-events: none;
  transform: translateX(-50%);
`;

export const MusicVisualizer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: flex-end;
  height: 30px;
  gap: 3px;
  z-index: 20;
  
  &::before,
  &::after {
    content: '';
    width: 4px;
    height: 15px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 2px;
    animation: ${wave} 1.5s ease-in-out infinite;
  }
  
  &::before {
    animation-delay: -0.5s;
  }
  
  &::after {
    animation-delay: -1.2s;
    height: 20px;
  }
  
  &:nth-child(2) {
    &::before {
      height: 25px;
      animation-delay: -0.8s;
    }
    
    &::after {
      height: 12px;
      animation-delay: -1.5s;
    }
  }
`;

// This component will be initialized in the main component with countdown logic
export const initCountdownTimer = () => {
  // ...existing code...
};

/**
 * Calculates the countdown string to next birthday date
 * @param nextBirthday The target birthday date
 * @returns Formatted countdown string
 */
export const calculateCountdown = (nextBirthday: Date): string => {
  const now = new Date();
  const difference = nextBirthday.getTime() - now.getTime();
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d ${hours}h ${minutes}m`;
};
