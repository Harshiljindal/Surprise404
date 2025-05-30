import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  text-align: center;
  margin: 2rem 0;
  font-family: 'Pacifico', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Section = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 2rem 0;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

const RoastPoem = styled.div`
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.6;
`;

const MemoryWall = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MemoryNote = styled(motion.div)`
  background: #feff9c;
  padding: 15px;
  width: 200px;
  min-height: 200px;
  transform: rotate(${() => Math.random() * 10 - 5}deg);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Indie Flower', cursive;
  font-size: 1.1rem;
  color: #333;
`;

const AudioControl = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const memories = [
    'Remember when we fought over the TV remote? Good times! 😂',
    'You\'ve always been my rock, my inspiration, and my best friend ❤️',
    'That time you covered for me when I broke mom\'s favorite vase...',
    'Your smile lights up the darkest days ✨',
    'Partner in crime since day one! 🤝',
  ];

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Add audio logic here
  };

  return (
    <Container>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
      />
      
      <Title
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Happy Birthday Didi! 🎂
      </Title>

      <Section>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: '1.2rem', lineHeight: 1.6 }}
        >
          To the most amazing sister in the universe! You've been my guide,
          my friend, and sometimes my personal ATM 😉. Thank you for all
          the moments we've shared, the laughs, the tears, and even the fights
          over the TV remote. Here's to many more years of sisterly love! ❤️
        </motion.p>
      </Section>

      <Section>
        <h2>Photo Gallery</h2>
        <Gallery>
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              src={`/images/photo${i}.jpg`}
              alt={`Memory ${i}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </Gallery>
      </Section>

      <Section>
        <h2>A Roast Poem Just for You</h2>
        <RoastPoem>
          There once was a sister so neat,<br />
          Who always stole my chocolate treat,<br />
          But I can't complain,<br />
          'Cause she's kept me sane,<br />
          And makes every day extra sweet! 🍫
        </RoastPoem>
      </Section>

      <Section>
        <h2>Memory Wall</h2>
        <MemoryWall>
          {memories.map((memory, index) => (
            <MemoryNote
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              {memory}
            </MemoryNote>
          ))}
        </MemoryWall>
      </Section>

      <AudioControl onClick={toggleMute}>
        {isMuted ? '🔇' : '🔊'}
      </AudioControl>
    </Container>
  );
};

export default Home;
