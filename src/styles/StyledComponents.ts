import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  gradientShift, bounce, twinkle, flameFlicker, 
  smokeRise, cakeHover, sparkle, frostedGlow, shimmer,
  rotateY, frostingPulse, sparkleGlow, candleFlicker, 
  waxDrip, flameGlow
} from './animations';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;600&display=swap');

  *, *::before, *::after { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: #000;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: inherit;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, 
    #ff9a9e 0%, 
    #fecfef 25%, 
    #a1c4fd 50%, 
    #c2e9fb 75%,
    #ffa6b5 100%
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 25s ease infinite;
  position: relative;
  overflow: hidden;
  padding: 20px;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 35%, rgba(255, 255, 255, 0.3) 0%, transparent 25%),
      radial-gradient(circle at 75% 65%, rgba(255, 236, 210, 0.3) 0%, transparent 25%);
    z-index: 1;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Starfield = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  &::before {
    content: "";
    position: absolute;
    top: 120vh;
    width: 2px;
    height: 2px;
    background: #ffffffaa;
    box-shadow: ${Array.from({ length: 100 })
      .map(() => `${Math.random() * 100}vw ${Math.random() * 100}vh 0 0 #ffffffaa`)
      .join(",")};
    animation: ${twinkle} 120s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const Title = styled(motion.h1)`
  font-family: "Great Vibes", cursive;
  font-size: clamp(2.5rem, 5vw + 1rem, 5rem);
  margin-bottom: 2rem;
  animation: ${bounce} 4s ease-in-out infinite;
  z-index: 10;
  text-shadow: 
    2px 2px 6px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(255, 255, 255, 0.6);
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Subtitle = styled(motion.h2)`
  font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem);
  font-weight: 300;
  z-index: 10;
  max-width: 90%;
  color: #fff9;
  margin-top: -1rem;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: scale(1.05);
  }
`;

export const MuteButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  padding: 12px;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover, &:focus-visible {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

// Cake components
export const CakeLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  box-shadow: 
    0 10px 25px rgba(0,0,0,0.25),
    inset 0 4px 10px rgba(255,255,255,0.7),
    inset 0 -2px 8px rgba(0,0,0,0.1);
  animation: ${frostedGlow} 3.5s ease-in-out infinite;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  transform-style: preserve-3d;

  // Frosting shimmering effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 18px;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(255, 255, 255, 0.15) 10%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 0.15) 90%,
      transparent 100%
    );
    background-size: 300% 100%;
    border-radius: 10px;
    filter: blur(1.2px);
    opacity: 0.85;
    animation: ${shimmer} 5s infinite linear;
    transform: translateZ(3px);
  }

  // Icing drips effect
  &::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 10%;
    width: 80%;
    height: 30px;
    background-image: 
      radial-gradient(circle at 5% 0, transparent 0%, transparent 68%, currentColor 68%, currentColor 100%),
      radial-gradient(circle at 15% 0, transparent 0%, transparent 70%, currentColor 70%, currentColor 100%),
      radial-gradient(circle at 25% 0, transparent 0%, transparent 66%, currentColor 66%, currentColor 100%),
      radial-gradient(circle at 35% 0, transparent 0%, transparent 72%, currentColor 72%, currentColor 100%),
      radial-gradient(circle at 45% 0, transparent 0%, transparent 67%, currentColor 67%, currentColor 100%),
      radial-gradient(circle at 55% 0, transparent 0%, transparent 73%, currentColor 73%, currentColor 100%),
      radial-gradient(circle at 65% 0, transparent 0%, transparent 69%, currentColor 69%, currentColor 100%),
      radial-gradient(circle at 75% 0, transparent 0%, transparent 71%, currentColor 71%, currentColor 100%),
      radial-gradient(circle at 85% 0, transparent 0%, transparent 68%, currentColor 68%, currentColor 100%),
      radial-gradient(circle at 95% 0, transparent 0%, transparent 70%, currentColor 70%, currentColor 100%);
    background-size: 10% 28px;
    background-repeat: space;
    filter: drop-shadow(0 8px 8px rgba(0,0,0,0.15));
    z-index: 5;
    animation: ${waxDrip} 4s ease-out;
    transform-origin: top;
  }
`;

export const Cake = styled.div`
  position: relative;
  width: 300px;
  height: 260px;
  cursor: pointer;
  z-index: 5;
  margin-bottom: 50px;
  animation: ${cakeHover} 5s ease-in-out infinite;
  perspective: 1500px;
  transform-style: preserve-3d;
  filter: drop-shadow(0 30px 40px rgba(0,0,0,0.25));
  transform: rotateX(5deg);

  ${CakeLayer}:nth-child(1) {
    bottom: 0;
    height: 95px;
    background: linear-gradient(180deg, 
      #ff9ec0 0%,
      #ff6999 40%,
      #ff4982 100%
    );
    background-size: 200% 200%;
    animation: ${gradientShift} 15s ease infinite;
    color: rgba(255, 95, 143, 0.85);
    transform: translateZ(0px) rotateX(3deg);
    border-radius: 30px 30px 25px 25px;
    box-shadow: 
      0 12px 30px rgba(255, 95, 143, 0.45),
      inset 0 -12px 18px rgba(0,0,0,0.12),
      inset 0 5px 15px rgba(255, 255, 255, 0.5);
  }

  ${CakeLayer}:nth-child(2) {
    bottom: 85px;
    height: 78px;
    width: 82%;
    left: 9%;
    background: linear-gradient(180deg, 
      #faffff 0%,
      #f2fbff 40%,
      #e0f5ff 100%
    );
    background-size: 200% 200%;
    animation: ${gradientShift} 12s ease-in-out infinite reverse;
    color: rgba(217, 240, 255, 0.85);
    transform: translateZ(12px) rotateX(-2deg);
    border-radius: 26px 26px 22px 22px;
    box-shadow: 
      0 10px 25px rgba(188, 226, 247, 0.7),
      inset 0 -10px 12px rgba(0,0,0,0.06),
      inset 0 5px 12px rgba(255, 255, 255, 0.6);
  }

  ${CakeLayer}:nth-child(3) {
    bottom: 152px;
    height: 65px;
    width: 67%;
    left: 16.5%;
    background: linear-gradient(180deg, 
      #fff5fa 0%,
      #ffdef0 40%,
      #ffbde0 100%
    );
    background-size: 200% 200%;
    animation: ${gradientShift} 10s ease infinite;
    color: rgba(255, 209, 230, 0.85);
    transform: translateZ(24px) rotateX(2deg);
    border-radius: 22px 22px 18px 18px;
    box-shadow: 
      0 8px 20px rgba(255, 177, 216, 0.7),
      inset 0 -8px 10px rgba(0,0,0,0.08),
      inset 0 4px 10px rgba(255, 255, 255, 0.7);
  }  &:hover {
    transform: scale(1.03) translateY(-8px) rotateX(8deg);
    filter: drop-shadow(0 35px 45px rgba(0,0,0,0.3));
    animation-play-state: paused;
    
    ${CakeLayer}:nth-child(1) { 
      transform: translateZ(30px) rotateX(5deg) scale(1.04);
      filter: brightness(1.2) contrast(1.08) saturate(1.1);
      box-shadow: 
        0 15px 35px rgba(255, 95, 143, 0.6),
        inset 0 -14px 20px rgba(0,0,0,0.15),
        inset 0 6px 18px rgba(255, 255, 255, 0.6);
      &::before {
        animation: ${shimmer} 1.2s infinite linear;
        opacity: 1;
        filter: blur(1px) brightness(1.2);
        height: 20px;
      }
      &::after {
        transform: translateY(3px) scale(1.05);
        filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2));
      }
    }
    ${CakeLayer}:nth-child(2) { 
      transform: translateZ(45px) rotateX(-3deg) scale(1.05);
      filter: brightness(1.25) contrast(1.08) saturate(1.1);
      box-shadow: 
        0 12px 30px rgba(188, 226, 247, 0.8),
        inset 0 -12px 15px rgba(0,0,0,0.08),
        inset 0 6px 15px rgba(255, 255, 255, 0.7);
      &::before {
        animation: ${shimmer} 1.2s infinite linear 0.3s;
        opacity: 1;
        filter: blur(1px) brightness(1.2);
        height: 20px;
      }
      &::after {
        transform: translateY(4px) scale(1.07);
        filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2));
      }
    }
    ${CakeLayer}:nth-child(3) { 
      transform: translateZ(60px) rotateX(3deg) scale(1.06);
      filter: brightness(1.3) contrast(1.1) saturate(1.15);
      box-shadow: 
        0 10px 25px rgba(255, 177, 216, 0.8),
        inset 0 -10px 12px rgba(0,0,0,0.1),
        inset 0 5px 12px rgba(255, 255, 255, 0.8);
      &::before {
        animation: ${shimmer} 1.2s infinite linear 0.5s;
        opacity: 1;
        filter: blur(1px) brightness(1.3);
        height: 20px;
      }
      &::after {
        transform: translateY(5px) scale(1.1);
        filter: drop-shadow(0 12px 12px rgba(0,0,0,0.25));
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CakeDecorations = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 6;
  transform-style: preserve-3d;

  // Fancy decorative elements (candies, berries, etc)
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: 
      // Top layer decorations - larger and more vibrant
      radial-gradient(circle at 15% 15%, #ff66a1 5px, transparent 7px),
      radial-gradient(circle at 30% 12%, #7ad1ff 6px, transparent 8px),
      radial-gradient(circle at 45% 10%, #ffb0d8 5px, transparent 7px),
      radial-gradient(circle at 60% 14%, #59c5ff 5px, transparent 7px),
      radial-gradient(circle at 75% 13%, #ff66a1 6px, transparent 8px),
      radial-gradient(circle at 90% 16%, #8ddbff 5px, transparent 7px),
      
      // Middle layer decorations - more variety and shimmer
      radial-gradient(circle at 10% 40%, #8ddbff 5px, transparent 7px),
      radial-gradient(circle at 25% 43%, #ffb0d8 6px, transparent 8px),
      radial-gradient(circle at 42% 38%, #59c5ff 5px, transparent 7px),
      radial-gradient(circle at 60% 35%, #ff66a1 6px, transparent 8px),
      radial-gradient(circle at 75% 42%, #8ddbff 5px, transparent 7px),
      radial-gradient(circle at 88% 36%, #ffb0d8 5px, transparent 7px),
      
      // Bottom layer decorations - richer colors
      radial-gradient(circle at 12% 67%, #ff66a1 6px, transparent 8px),
      radial-gradient(circle at 28% 70%, #8ddbff 5px, transparent 7px),
      radial-gradient(circle at 45% 68%, #ffb0d8 6px, transparent 8px),
      radial-gradient(circle at 62% 72%, #59c5ff 5px, transparent 7px),
      radial-gradient(circle at 78% 69%, #ff66a1 6px, transparent 8px),
      radial-gradient(circle at 92% 73%, #8ddbff 5px, transparent 7px),
      
      // Additional decorative elements
      radial-gradient(ellipse at 18% 25%, #ffeb3b 2px, transparent 4px),
      radial-gradient(ellipse at 35% 28%, #ffeb3b 2px, transparent 4px),
      radial-gradient(ellipse at 52% 22%, #ffeb3b 2px, transparent 4px),
      radial-gradient(ellipse at 68% 27%, #ffeb3b 2px, transparent 4px),
      radial-gradient(ellipse at 85% 24%, #ffeb3b 2px, transparent 4px);
    opacity: 0.9;
    transition: all 0.5s ease;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
    animation: ${frostingPulse} 8s ease-in-out infinite alternate;
    transform: translateZ(5px);
  }

  // Detailed sprinkles and shimmer
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: 
      // Gold shimmer spots - enhanced shimmer
      radial-gradient(circle at 20% 22%, rgba(255, 215, 0, 0.9) 1.5px, transparent 3px),
      radial-gradient(circle at 39% 18%, rgba(255, 215, 0, 0.9) 1.5px, transparent 3px),
      radial-gradient(circle at 65% 20%, rgba(255, 215, 0, 0.9) 1.5px, transparent 3px),
      radial-gradient(circle at 82% 19%, rgba(255, 215, 0, 0.9) 1.5px, transparent 3px),
      radial-gradient(circle at 25% 30%, rgba(255, 215, 0, 0.9) 1px, transparent 2.5px),
      radial-gradient(circle at 45% 28%, rgba(255, 215, 0, 0.9) 1px, transparent 2.5px),
      radial-gradient(circle at 70% 32%, rgba(255, 215, 0, 0.9) 1px, transparent 2.5px),
      
      // Silver shimmer spots - more of them for better sparkle
      radial-gradient(circle at 15% 45%, rgba(255, 255, 255, 0.95) 1.5px, transparent 3px),
      radial-gradient(circle at 33% 48%, rgba(255, 255, 255, 0.95) 1.5px, transparent 3px),
      radial-gradient(circle at 55% 43%, rgba(255, 255, 255, 0.95) 1.5px, transparent 3px),
      radial-gradient(circle at 72% 50%, rgba(255, 255, 255, 0.95) 1.5px, transparent 3px),
      radial-gradient(circle at 88% 46%, rgba(255, 255, 255, 0.95) 1.5px, transparent 3px),
      radial-gradient(circle at 22% 60%, rgba(255, 255, 255, 0.9) 1px, transparent 2.5px),
      radial-gradient(circle at 42% 58%, rgba(255, 255, 255, 0.9) 1px, transparent 2.5px),
      radial-gradient(circle at 65% 62%, rgba(255, 255, 255, 0.9) 1px, transparent 2.5px),
      radial-gradient(circle at 80% 59%, rgba(255, 255, 255, 0.9) 1px, transparent 2.5px),
      
      // Colorful sprinkles - more variation and density
      linear-gradient(60deg, #ff66a1 1.5px, transparent 1.5px) 0 0 / 10px 14px,
      linear-gradient(-60deg, #59c5ff 1.5px, transparent 1.5px) 0 0 / 14px 12px,
      linear-gradient(30deg, #ffb0d8 1.5px, transparent 1.5px) 0 0 / 12px 10px,
      linear-gradient(120deg, #ffe066 1px, transparent 1px) 0 0 / 16px 16px,
      linear-gradient(-120deg, #a6ff66 1px, transparent 1px) 0 0 / 18px 14px;
    opacity: 0.8;
    transition: all 0.5s ease;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    animation: ${frostingPulse} 6s ease-in-out infinite alternate-reverse;
    transform: translateZ(10px);
  }

  &::before, &::after {
    animation-play-state: running;
    background-size: auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
  }

  ${Cake}:hover & {
    &::before {
      opacity: 1;
      filter: brightness(1.3) drop-shadow(0 4px 8px rgba(0,0,0,0.2));
      transform: translateZ(15px) scale(1.03);
      animation: ${sparkleGlow} 2s ease-in-out infinite alternate;
    }
    &::after {
      opacity: 0.95;
      filter: brightness(1.4) drop-shadow(0 3px 6px rgba(0,0,0,0.15));
      background-position: 3px 3px;
      transform: translateZ(20px) scale(1.05);
      animation: ${sparkleGlow} 1.5s ease-in-out infinite alternate 0.5s;
    }
  }
`;

export const CakeBaseShadow = styled.div`
  position: absolute;
  bottom: -40px;
  left: 2%;
  width: 96%;
  height: 55px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.25) 20%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0.05) 80%,
    transparent 100%
  );
  filter: blur(12px);
  border-radius: 50%;
  z-index: 1;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center center;
  opacity: 0.8;
  animation: ${frostingPulse} 5s ease-in-out infinite alternate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 102, 161, 0.25) 0%,
      rgba(255, 102, 161, 0.15) 30%,
      rgba(89, 197, 255, 0.07) 60%,
      transparent 100%
    );
    filter: blur(10px);
    opacity: 0.7;
    animation: ${sparkleGlow} 7s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 10%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 235, 59, 0.15) 0%,
      rgba(255, 235, 59, 0.07) 40%,
      transparent 100%
    );
    filter: blur(8px);
    opacity: 0.5;
    animation: ${sparkleGlow} 4s ease-in-out infinite alternate-reverse;
  }

  ${Cake}:hover & {
    transform: scale(1.25) translateY(12px);
    filter: blur(18px);
    opacity: 0.95;
    width: 100%;
    left: 0;
    
    &::before {
      opacity: 0.9;
      filter: blur(15px);
      animation-duration: 3s;
    }
    
    &::after {
      opacity: 0.7;
      filter: blur(10px);
      animation-duration: 2s;
    }
  }
`;

export const Candle = styled.div`
  position: absolute;
  top: -20px; /* Positioned on top of the cake's top layer */
  left: 50%;
  transform: translateX(-50%);
  width: 22px; /* Slightly narrower */
  height: 75px; /* Shorter candle */
  background: linear-gradient(90deg,
    #ffee99 0%,
    #ffffea 15%,
    #ffffef 50%,
    #ffffea 85%,
    #ffee99 100%
  );
  background-size: 200% 100%;
  border-radius: 13px 13px 6px 6px;
  box-shadow: 
    0 7px 20px rgba(255, 179, 71, 0.5),
    0 0 30px rgba(255, 179, 71, 0.2),
    inset 3px 0 8px rgba(255,255,255,0.9),
    inset -3px 0 8px rgba(255, 183, 77, 0.5);
  z-index: 10;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${candleFlicker} 5s ease-in-out infinite;
  transform-style: preserve-3d;
  // Fancy decorative spiral and 3D texture
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    height: 85%;
    background: 
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 6px,
        rgba(255, 183, 77, 0.25) 6px,
        rgba(255, 183, 77, 0.25) 10px
      ),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.3) 20%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.3) 80%,
        rgba(255, 255, 255, 0.1)
      );
    background-size: 20px 20px, 100% 100%;
    border-radius: 10px;
    animation: ${shimmer} 25s linear infinite;
    opacity: 0.75;
    filter: blur(0.5px);
    transform: translateZ(2px);
  }

  // Enhanced wax drips with 3D effect
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: -5px;
    right: -5px;
    height: 15px;
    background: linear-gradient(90deg,
      #ffee99 0%,
      #ffffef 50%,
      #ffee99 100%
    );
    border-radius: 8px 8px 12px 12px;
    box-shadow: 
      0 5px 8px rgba(0,0,0,0.15),
      inset 0 3px 6px rgba(255,255,255,0.9);
    transform-origin: top center;
    animation: ${waxDrip} 8s ease-out infinite alternate;
    
    clip-path: polygon(
      0% 0%,
      15% 0%,
      20% 100%,
      30% 0%,
      40% 0%,
      45% 70%,
      50% 0%,
      60% 0%,
      65% 100%,
      75% 0%,
      85% 0%,
      90% 80%,
      95% 0%,
      100% 0%,
      100% 100%,
      0% 100%
    );
    transform: translateZ(3px);
  }

  // Additional decorative element - candle wick
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: #a67c52;
    border-radius: 2px;
    z-index: 1;
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
  }

  &:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 
      0 10px 30px rgba(255, 179, 71, 0.7),
      0 0 40px rgba(255, 179, 71, 0.3),
      inset 4px 0 10px rgba(255,255,255,0.95),
      inset -4px 0 10px rgba(255, 183, 77, 0.6);
    animation: ${candleFlicker} 2s ease-in-out infinite;
    
    &::before {
      opacity: 0.95;
      animation: ${shimmer} 10s linear infinite;
      filter: brightness(1.1) blur(0.3px);
    }
    
    &::after {
      transform: translateZ(3px) scaleX(1.05);
      filter: brightness(1.1);
      animation-duration: 4s;
    }
  }
`;

export const Flame = styled.div`
  position: absolute;
  top: -30px; /* Positioned on top of the candle */
  left: 50%;
  transform: translateX(-50%) translateY(0);
  width: 24px; /* Slightly smaller */
  height: 35px; /* Shorter flame */
  filter: 
    drop-shadow(0 0 20px rgba(255, 119, 31, 0.9)) 
    drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))
    drop-shadow(0 0 30px rgba(255, 139, 51, 0.4));
  animation: ${flameFlicker} 3s ease-in-out infinite;
  z-index: 11;
  perspective: 120px;
  transform-style: preserve-3d;
  animation: ${flameGlow} 4s ease-in-out infinite alternate;
  will-change: transform, filter;
`;

export const FlameShape = styled.div`
  position: relative;
  width: 18px;
  height: 28px;
  background: radial-gradient(
    ellipse at center,
    #ffffff 0%,
    #fffef0 3%,
    #fffcdd 5%,
    #fff4ad 10%,
    #ffea5f 15%,
    #ffd327 25%,
    #ff9f17 40%,
    #ff7417 60%,
    #ff5e17 75%,
    transparent 95%
  );
  border-radius: 50% 50% 30% 30% / 60% 60% 40% 40%;
  filter: 
    drop-shadow(0 0 25px rgba(255, 143, 23, 0.9)) 
    drop-shadow(0 0 12px rgba(255, 230, 110, 0.7))
    drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  margin: 0 auto;
  animation: 
    ${rotateY} 8s linear infinite,
    ${flameFlicker} 4s ease-in-out infinite alternate;
  transform-style: preserve-3d;
  transform-origin: center bottom;

  // Inner flame core - brighter, more intense
  &::before {
    content: "";
    position: absolute;
    top: 7px;
    left: 8px;
    width: 10px;
    height: 20px;
    background: radial-gradient(
      ellipse at center,
      #ffffff 0%,
      #fffff8 15%,
      #fffef0 25%,
      #fff9cf 40%,
      #ffee96 60%,
      #ffdb5c 80%,
      transparent 100%
    );
    border-radius: 50% 50% 30% 30% / 60% 60% 35% 35%;
    filter: 
      drop-shadow(0 0 20px rgba(255, 235, 150, 1)) 
      drop-shadow(0 0 15px rgba(255, 255, 190, 0.9))
      blur(0.5px);
    animation: 
      ${flameFlicker} 2s ease-in-out infinite alternate,
      ${rotateY} 6s linear reverse infinite;
    transform: translateZ(3px) rotate(-5deg) scale(0.95);
    opacity: 0.95;
    mix-blend-mode: screen;
  }

  // Enhanced flame base with more dynamic appearance
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: -3px;
    right: -3px;
    height: 18px;
    background: linear-gradient(
      to bottom,
      #ff8f17 0%,
      #ff7417 20%,
      rgba(255, 143, 23, 0.8) 40%,
      rgba(255, 116, 23, 0.6) 60%,
      rgba(255, 116, 23, 0.2) 80%,
      transparent 100%
    );
    border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;
    filter: blur(2.5px);
    transform: translateZ(-1px) scaleX(1.4);
    opacity: 0.8;
    transform-origin: center bottom;
    animation: 
      ${flameFlicker} 1.5s ease-in-out infinite alternate-reverse,
      ${sparkleGlow} 3s ease-in-out infinite;
    mix-blend-mode: screen;
  }
  
  // Sophisticated flame particles and sparks
  &:after {
    content: '';
    position: absolute;
    top: -15px;
    left: -5px;
    right: -5px;
    height: 15px;
    background: 
      radial-gradient(circle at 30% 70%, rgba(255, 245, 154, 0.9) 1px, transparent 4px),
      radial-gradient(circle at 70% 90%, rgba(255, 245, 154, 0.9) 1.5px, transparent 4px),
      radial-gradient(circle at 50% 50%, rgba(255, 245, 154, 0.9) 1px, transparent 3px),
      radial-gradient(circle at 25% 80%, rgba(255, 214, 0, 0.8) 0.5px, transparent 2px),
      radial-gradient(circle at 75% 40%, rgba(255, 214, 0, 0.8) 0.5px, transparent 2.5px),
      radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.7) 0.5px, transparent 2px),
      radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.7) 0.5px, transparent 2px);
    filter: blur(0.5px);
    animation: ${sparkle} 3s infinite ease-in-out alternate;
    opacity: 0.9;
    transform: translateZ(4px);
    mix-blend-mode: screen;
  }
  
  // Additional flame halo effect
  &:before {
    content: '';
    position: absolute;
    inset: -5px;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 230, 110, 0.3) 0%,
      rgba(255, 209, 51, 0.2) 30%,
      rgba(255, 174, 0, 0.1) 60%,
      transparent 100%
    );
    border-radius: inherit;
    filter: blur(6px);
    z-index: -1;
    opacity: 0.5;
    animation: ${sparkleGlow} 4s infinite ease-in-out alternate;
    transform: translateZ(-2px) scale(1.2);
  }
`;

export const Sparkles = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    filter: drop-shadow(0 0 6px #ffb347);
  }

  &::before {
    animation: ${sparkle} 2s ease-in-out infinite;
    left: 0;
  }

  &::after {
    animation: ${sparkle} 2s ease-in-out infinite 1s;
    right: 0;
  }
`;

export const Smoke = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  width: 8px;
  height: 25px;
  background: radial-gradient(circle at center, rgba(200,200,200,0.3), transparent);
  border-radius: 50%;
  animation: ${smokeRise} 3s linear infinite;
  filter: blur(4px);
  z-index: 9;
  pointer-events: none;
  opacity: 0.6;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: inherit;
  }

  &::before {
    animation-delay: -1s;
    transform: translateX(-10px);
  }

  &::after {
    animation-delay: -2s;
    transform: translateX(10px);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.3;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
`;

export const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, #222 0%, #333 100%);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 0 20px #ffb347,
    0 0 40px rgba(255, 179, 71, 0.4);
  max-width: min(90vw, 500px);
  max-height: 80vh;
  color: #fff;
  font-size: clamp(1rem, 1.2vw + 0.5rem, 1.4rem);
  text-align: center;
  user-select: none;
  position: relative;
  overflow: auto;

  h2 {
    margin-bottom: 1.5rem;
    font-family: 'Great Vibes', cursive;
    font-size: clamp(1.8rem, 2.5vw + 1rem, 2.5rem);
    background: linear-gradient(45deg, #fff, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #fffa;
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    
    button {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 15px;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      
      svg {
        font-size: 0.9rem;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
      
      &.active {
        background: linear-gradient(45deg, #ffb347, #ffcc33);
        color: #222;
        box-shadow: 0 4px 12px rgba(255, 179, 71, 0.4);
      }
    }
  }
  
  .tab-content {
    margin: 20px 0;
    min-height: 150px;
  }
    .photo-grid {
    perspective: 1000px;
    
    p {
      margin-bottom: 15px;
    }
    
    .photo-collection {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 15px;
      
      .photo-item {
        border-radius: 10px;
        overflow: hidden;
        border: 2px solid rgba(255, 255, 255, 0.1);
        transition: all 0.4s ease;
        position: relative;
        transform-style: preserve-3d;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        
        img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          transition: all 0.3s ease;
        }
        
        .photo-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 5px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 0.8rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        
        &:hover {
          border-color: #ffb347;
          
          .photo-caption {
            transform: translateY(0);
          }
          
          img {
            filter: brightness(1.1);
          }
        }
      }
    }
  }
    .wish-list {
    text-align: left;
    margin: 0 auto;
    display: inline-block;
    
    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;
      transition: all 0.3s ease;
      
      &::before {
        content: '✨';
        position: absolute;
        left: 0;
        color: #ffb347;
        transition: all 0.3s ease;
      }
    }
  }
  
  .special-wish {
    margin-top: 25px;
    padding: 15px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 15px;
    backdrop-filter: blur(5px);
    box-shadow: 
      0 0 10px rgba(255, 215, 0, 0.3),
      0 0 20px rgba(255, 215, 0, 0.2);
    
    span {
      font-family: 'Great Vibes', cursive;
      font-size: 1.5rem;
      background: linear-gradient(45deg, #ffd700, #ffa500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }

  .close-button {
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: linear-gradient(45deg, #ffb347, #ffcc33);
    color: #222;
    font-weight: 600;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover, &:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 179, 71, 0.4);
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  }

  .message-content {
    p {
      line-height: 1.6;
      margin-bottom: 1.5rem;
      color: #fffa;
      text-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .highlight-message {
      margin: 1.5rem 0;
      padding: 15px;
      background: linear-gradient(135deg, rgba(255, 154, 158, 0.2), rgba(255, 255, 255, 0.05));
      border-radius: 15px;
      backdrop-filter: blur(5px);
      box-shadow: 
        0 0 10px rgba(255, 154, 158, 0.3),
        0 0 20px rgba(255, 154, 158, 0.2);
      
      span {
        font-family: 'Great Vibes', cursive;
        font-size: 1.8rem;
        background: linear-gradient(45deg, #fff, #ff9a9e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
    }
    
    .signature {
      font-style: italic;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
`;

export const BirthdayGif = styled.div`
  width: 300px;
  height: 300px;
  margin: 2rem 0 3rem;
  position: relative;
  z-index: 5;
  cursor: pointer;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
  }

  &:hover {
    transform: scale(1.05);
  }
`;
