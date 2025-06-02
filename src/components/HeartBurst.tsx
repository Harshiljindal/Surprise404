import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export const HeartBurst: React.FC = () => {
  // Create an array of hearts with random positions and animations
  const hearts = Array.from({ length: 15 }).map((_, index) => {    const size = Math.random() * 15 + 7; // Even smaller hearts for more elegance
    const duration = Math.random() * 1.0 + 0.7; // Faster animation for better effect
    // Create a more realistic upward burst pattern
    const angle = (Math.random() * Math.PI) - (Math.PI/2); // Angles focused upward (-90° to +90°)
    const distance = Math.random() * 100 + 40; // Random distance from center
    const x = Math.cos(angle) * distance; // Calculate x based on angle
    const y = Math.sin(angle) * distance - 40; // More upward bias
    const delay = Math.random() * 0.2; // Even shorter delays for more immediate effect
    
    // Generate random color variation for hearts
    const hue = Math.floor(Math.random() * 20) + 345; // Red to pink range
    const saturation = Math.floor(Math.random() * 20) + 75; // High saturation
    const lightness = Math.floor(Math.random() * 15) + 65; // Medium to high lightness
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.85)`; 
    
    return (
      <motion.div
        key={index}
        initial={{ 
          opacity: 0.9, 
          scale: 0.2,
          x: 0,
          y: 0,
          color: color,
          rotate: Math.random() * 30 - 15 // Initial random rotation
        }}
        animate={{ 
          opacity: 0, 
          scale: 1.2,
          x: x,
          y: y,
          color: `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`,
          rotate: Math.random() * 180 - 90 // More rotation during animation
        }}
        transition={{ 
          duration: duration,
          delay: delay,
          ease: "easeOut",
          scale: { type: "spring", stiffness: 100 } // Springy effect for scale
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          fontSize: size,
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' // Slight glow effect
        }}
      >
        <FaHeart />
      </motion.div>
    );
  });
    return (
    <motion.div
      style={{
        position: 'absolute',
        top: '-30px', // Positioned at the top of the candle
        left: '50%',
        width: '1px',
        height: '1px',
        zIndex: 20,
        pointerEvents: 'none',
        transform: 'translateX(-50%)'
      }}
    >
      {hearts}
    </motion.div>
  );
};

export default HeartBurst;
