import { useEffect, useState, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar, FaRocket, FaMusic, FaPause, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Animations
const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

// Styled Components
const CosmicContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(76, 0, 255, 0.15) 0%, transparent 20%),
    radial-gradient(circle at 80% 70%, rgba(0, 195, 255, 0.15) 0%, transparent 20%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: white;
`;

const Star = styled.div<{ size: number; top: string; left: string; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: white;
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  animation: ${twinkle} ${props => 2 + props.delay}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const Dot = styled.div<{ size: number; top: string; left: string; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
`;

const GlowStar = styled.div`
  position: absolute;
  top: 40px;
  right: 30%;
  color: #00dfff;
  font-size: 40px;
  filter: drop-shadow(0 0 15px #00dfff);
  animation: ${pulse} 3s ease-in-out infinite;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  background: linear-gradient(135deg, #00dfff 0%, #a020f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
`;

const SubtitleBlue = styled(motion.h2)`
  font-size: 2.2rem;
  color: #00dfff;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 0 10px rgba(0, 223, 255, 0.7);
`;

const SubtitlePurple = styled(motion.h2)`
  font-size: 2.2rem;
  color: #a020f0;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 0 10px rgba(160, 32, 240, 0.7);
`;

const SubtitleYellow = styled(motion.h2)`
  font-size: 2.2rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
`;

const HappyBirthday = styled(motion.h1)`
  font-size: 3.5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa6c9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
`;

const Rocket = styled(motion.span)`
  position: relative;
  top: -5px;
  left: 10px;
  font-size: 3rem;
  color: #ff6b6b;
`;

const SparkStar = styled(motion.span)`
  position: relative;
  top: -5px;
  left: 15px;
  font-size: 2.5rem;
  color: #ffd700;
`;

const CosmicCircle = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top: 3px solid #00dfff;
  border-left: 3px solid #a020f0;
  border-right: 3px solid #ffd700;
  animation: ${spin} 10s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid #a020f0;
    border-left: 3px solid #ffd700;
    border-right: 3px solid #00dfff;
    animation: ${spin} 6s linear infinite reverse;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 25px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid #ffd700;
    border-left: 3px solid #00dfff;
    border-right: 3px solid #a020f0;
    animation: ${spin} 4s linear infinite;
  }
`;

const StoryButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 90px;
  padding: 10px 20px;
  border-radius: 25px;
  background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 16px;
  box-shadow: 0 0 15px rgba(255, 20, 147, 0.5);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 20, 147, 0.7);
  }
`;

const MusicButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00dfff 0%, #a020f0 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 0 15px rgba(0, 223, 255, 0.5);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(160, 32, 240, 0.7);
  }
`;

const CosmicBlessing: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Stop all audio from previous screens and prefetch next route
  useEffect(() => {
    // Stop all audio elements when component mounts
    const allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Stop any Audio objects that might be playing
    const stopBackgroundSounds = () => {
      // This helps with garbage collection and stops any lingering audio
      const soundContext = window.AudioContext || (window as any).webkitAudioContext;
      if (soundContext) {
        try {
          const tempContext = new soundContext();
          tempContext.close();
        } catch (e) {
          console.error("Error closing audio context:", e);
        }
      }
    };
    
    stopBackgroundSounds();
    
    // Prefetch next route
    import('./ShareStory').catch(() => {
      // Silent error - just prefetching
    });
  }, []);
  // Initialize audio with optimized settings
  useEffect(() => {
    const setupAudio = () => {
      try {
        // Create and configure the audio element only once
        if (!audioRef.current) {
          // Using a more direct path to the audio file
          audioRef.current = new Audio('/src/pages/sounds/2.mp3');
          
          // Configure for better performance
          audioRef.current.loop = true;
          audioRef.current.volume = 0.7;
          audioRef.current.preload = 'auto';
          
          // Add event listeners for better error handling
          audioRef.current.addEventListener('error', (e) => {
            console.error('Audio loading error:', e);
            audioRef.current = null; // Clear reference on error
          });
          
          // Some browsers require user interaction before audio can play
          // This allows us to at least set up the audio object
          audioRef.current.load();
        }
      } catch (err) {
        console.error("Error setting up audio:", err);
      }
    };
    
    // Set up audio with a small delay to avoid initialization issues
    const timer = setTimeout(setupAudio, 300);
    
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        // Properly cleanup event listeners and references
        audioRef.current.pause();
        audioRef.current.src = ''; // Clear source to stop any downloads
        audioRef.current.remove(); // Ensure proper DOM cleanup
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music toggle with enhanced error handling and user feedback
  const toggleMusic = () => {
    try {
      if (!audioRef.current) {
        // Try to recreate the audio if reference was lost
        audioRef.current = new Audio('/src/pages/sounds/2.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.7;
      }
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Use Promise with timeout for better error handling
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(err => {
              console.error("Audio playback error:", err);
              setIsPlaying(false);
              // Could show a toast/notification here if needed
            });
        }
      }
    } catch (err) {
      console.error("Toggle music error:", err);
      setIsPlaying(false);
    }
  };
  // Create stars - memoize to prevent recreation on re-renders
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, index) => { // Reduced number of stars
      const size = Math.random() * 3 + 1;
      return (
        <Star
          key={index}
          size={size}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          delay={Math.random() * 5}
        />
      );
    });
  }, []); // Empty dependency array - never recreate stars

  // Create colored dots - memoize to prevent recreation on re-renders
  const dots = useMemo(() => {
    return Array.from({ length: 15 }).map((_, index) => {
      const size = Math.random() * 10 + 5;
      const colors = ['#a020f0', '#00dfff', '#ffd700'];
      return (
        <Dot
          key={index}
          size={size}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          color={colors[Math.floor(Math.random() * colors.length)]}
        />
      );
    });  }, []); // Empty dependency array - never recreate dots

  return (
    <CosmicContainer>
      {stars}
      {dots}
      <GlowStar>
        <FaStar />
      </GlowStar>

      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Cosmic Blessing
      </Title>

      <SubtitleBlue
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Is saal tu chamkega jaise supernova,
      </SubtitleBlue>

      <SubtitlePurple
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Success, health aur happiness se charged!
      </SubtitlePurple>

      <SubtitleYellow
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        Universe teri taraf hai.
      </SubtitleYellow>

      <HappyBirthday
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Happy Birthday Meri Bhen!
        <Rocket
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <FaRocket />
        </Rocket>
        <SparkStar
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <FaStar />
        </SparkStar>
      </HappyBirthday>

      <CosmicCircle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />      <StoryButton onClick={() => navigate('/share-story')}>
        <FaInstagram /> Create Insta Story
      </StoryButton>
      <MusicButton onClick={toggleMusic}>
        {isPlaying ? <FaPause /> : <FaMusic />}
      </MusicButton>
    </CosmicContainer>
  );
};

export default CosmicBlessing;