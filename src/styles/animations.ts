import { keyframes } from 'styled-components';

export const gradientShift = keyframes`
  0%   { background-position: 0% 50% }
  50%  { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const bounce = keyframes`
  0%, 100% { transform: translateY(0) }
  50%      { transform: translateY(-15px) }
`;

export const twinkle = keyframes`
  from { 
    transform: translateY(0) rotate(0deg);
    opacity: .8;
  }
  to { 
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
    filter: blur(2px);
  }
`;

export const flameFlicker = keyframes`
  0%   { transform: translateY(0) scale(1) rotate(-2deg); opacity: 0.9; }
  25%  { transform: translateY(-1px) scale(1.05) rotate(2deg); opacity: 1; }
  50%  { transform: translateY(-2px) scale(1.1) rotate(-1deg); opacity: 0.8; }
  75%  { transform: translateY(-1px) scale(1.05) rotate(1deg); opacity: 0.9; }
  100% { transform: translateY(0) scale(1) rotate(-2deg); opacity: 0.9; }
`;

export const smokeRise = keyframes`
  0% {
    opacity: 0.4;
    transform: translateY(0) translateX(-50%) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) translateX(-30%) rotate(15deg) scale(1.6);
  }
`;

export const cakeHover = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-8px) rotate(0.5deg); }
`;

export const sparkle = keyframes`
  0%, 100% { transform: scale(0); opacity: 0; }
  50%      { transform: scale(1); opacity: 1; }
`;

export const frostedGlow = keyframes`
  0%, 100% { 
    box-shadow: 
      0 5px 15px rgba(255, 255, 255, 0.3),
      0 -2px 6px rgba(255, 255, 255, 0.2) inset;
  }
  50% { 
    box-shadow: 
      0 5px 25px rgba(255, 255, 255, 0.5),
      0 -2px 10px rgba(255, 255, 255, 0.3) inset;
  }
`;

export const icingDrip = keyframes`
  0% { height: 0; opacity: 0; }
  20% { height: 0; opacity: 1; }
  100% { height: 30px; opacity: 1; }
`;

export const candleGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 15px 5px rgba(255, 179, 71, 0.4),
                0 0 4px 2px rgba(255, 179, 71, 0.6) inset;
  }
  50% { 
    box-shadow: 0 0 25px 8px rgba(255, 179, 71, 0.6),
                0 0 8px 4px rgba(255, 179, 71, 0.8) inset;
  }
`;

export const shimmer = keyframes`
  0% { 
    background-position: -100% 0;
  }
  100% { 
    background-position: 200% 0;
  }
`;

export const rotateY = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

export const frostingPulse = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
    filter: brightness(1.1);
  }
`;

export const sparkleGlow = keyframes`
  0%, 100% {
    opacity: 0.4;
    filter: blur(1px) brightness(1);
  }
  50% {
    opacity: 0.9;
    filter: blur(2px) brightness(1.5);
  }
`;

export const candleFlicker = keyframes`
  0%, 100% {
    opacity: 0.95;
    transform: scale(1) translateY(0) rotate(0deg);
    filter: brightness(1);
  }
  25% {
    opacity: 1;
    transform: scale(1.02) translateY(-1px) rotate(0.5deg);
    filter: brightness(1.1);
  }
  75% {
    opacity: 0.9;
    transform: scale(0.98) translateY(1px) rotate(-0.5deg);
    filter: brightness(0.95);
  }
`;

export const waxDrip = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  30% {
    transform: scaleY(0.3);
    opacity: 0.3;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

export const flameGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 15px rgba(255, 119, 31, 0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(255, 119, 31, 0.9)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
    transform: scale(1.05);
  }
`;
