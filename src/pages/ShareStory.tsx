import styled, { keyframes } from 'styled-components';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const StoryContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  position: relative;
`;

const glitter = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
`;

const StoryCard = styled.div`
  width: 360px;
  height: 640px;
  background: linear-gradient(135deg, 
    #FF1493 0%, 
    #FF69B4 35%,
    #DA70D6 65%,
    #FF1493 100%);
  background-size: 200% 200%;
  animation: ${shine} 20s linear infinite;
  border-radius: 20px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 
    0 10px 30px rgba(255, 20, 147, 0.3),
    inset 0 0 60px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: 
      radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%),
      radial-gradient(circle at 100% 0%, rgba(255,255,255,0.15) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E");
    background-size: 40px 40px;
    opacity: 0.3;
    animation: ${glitter} 3s ease-in-out infinite;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 0;
  gap: 15px;
`;

// Animation for future use
// const shimmer = keyframes`
//   0% { background-position: -200% center; }
//   100% { background-position: 200% center; }
// `;

const BirthdayHeading = styled.div`
  text-align: center;
  margin: 0;
  position: relative;
  padding: 1px;
  border-radius: 15px;
  background: rgba(255,255,255,0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);  h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 4.2rem;
    margin: 0;
    color: white;
    text-shadow: 
      0 0 10px rgba(255,215,0,0.5),
      0 0 20px rgba(255,215,0,0.3),
      0 0 30px rgba(255,215,0,0.2),
      2px 2px 2px rgba(0,0,0,0.3);
  }
  span {
    font-family: 'Indie Flower', cursive;
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.95);
    display: block;
    margin-top: 10px;
    text-shadow: 
      0 0 10px rgba(255,215,0,0.3),
      1px 1px 2px rgba(0,0,0,0.3);
    letter-spacing: 2px;
  }

  &::after {
    content: '✨';
    position: absolute;
    top: 0;
    right: -30px;
    font-size: 2rem;
    animation: ${glitter} 2s ease-in-out infinite;
  }

  &::before {
    content: '✨';
    position: absolute;
    top: 0;
    left: -30px;
    font-size: 2rem;
    animation: ${glitter} 2s ease-in-out infinite 1s;
  }
`;

const Message = styled.div`
  font-family: 'Indie Flower', cursive;  font-size: 1.7rem;
  color: white;
  text-align: center;
  line-height: 1.25;
  padding: 15px;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 
    0 4px 15px rgba(0,0,0,0.1),
    0 0 0 1px rgba(255,255,255,0.2),
    inset 0 0 30px rgba(255,255,255,0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 15px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 15px;
    background: radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent 70%);
    pointer-events: none;
  }
`;

// Component for future use
// const Balloon = styled.div`
//   position: absolute;
//   font-size: 3rem;
//   animation: ${float} 3s ease-in-out infinite;
//   &.top-left {
//     top: 40px;
//     left: 30px;
//   }
//   &.top-right {
//     top: 60px;
//     right: 30px;
//     animation-delay: 0.5s;
//   }
//   &.bottom-left {
//     bottom: 60px;
//     left: 40px;
//     animation-delay: 1s;
//   }
//   &.bottom-right {
//     bottom: 40px;
//     right: 40px;
//     animation-delay: 1.5s;
//   }
// `;

const EmojiContainer = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  padding: 12px;
  border-radius: 20px;
  box-shadow: 
    inset 0 0 20px rgba(255,255,255,0.15),
    0 4px 15px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
`;

const CakeEmoji = styled.div`
  font-size: 4.2rem;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 15px rgba(255,255,255,0.4));
  transform-origin: center;
  animation: ${float} 3s ease-in-out infinite;
`;

const GiftRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 2.8rem;
  
  span {
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
    &:nth-child(1) { animation: ${float} 3s ease-in-out infinite; }
    &:nth-child(2) { animation: ${float} 3s ease-in-out infinite 0.5s; }
    &:nth-child(3) { animation: ${float} 3s ease-in-out infinite 1s; }
  }
`;

interface SparkleProps {
  delay?: string;
  fontSize?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const DecorativeSparkle = styled.div<SparkleProps>`
  position: absolute;
  font-size: ${props => props.fontSize || '1.8rem'};
  opacity: 0.8;
  animation: ${glitter} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const DownloadButton = styled.button`
  position: fixed;
  bottom: 20px;
  padding: 10px 20px;
  background: #ff1493;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
  }
`;

const ShareStory = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  const downloadStory = async () => {
    if (storyRef.current) {
      try {
        const canvas = await html2canvas(storyRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'birthday-story.png';
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };  return (
    <StoryContainer>
      <StoryCard ref={storyRef}>
        <CardContent>
          <BirthdayHeading>
            <h1>Happy Birthday!</h1>
            <span>To my amazing sister ✨</span>
          </BirthdayHeading>

          <Message>
            Another level unlocked 🎮👑
Naya year, naye goals, wahi swag 😎
          </Message>          <EmojiContainer>
            <CakeEmoji>🎂</CakeEmoji>          <GiftRow>
              <span>🎈</span>
              <span>🎁</span>
              <span>🎈</span>
            </GiftRow>
          </EmojiContainer>

          {/* Decorative sparkles with different sizes */}
          <DecorativeSparkle 
            top="10%" 
            right="10%" 
            fontSize="1.8rem"
          >✨</DecorativeSparkle>
          <DecorativeSparkle 
            bottom="15%" 
            left="10%" 
            fontSize="2.2rem"
            delay="1s"
          >✨</DecorativeSparkle>
          <DecorativeSparkle 
            top="40%" 
            left="5%" 
            fontSize="1.5rem"
            delay="0.5s"
          >✨</DecorativeSparkle>
        </CardContent>
      </StoryCard>
      <DownloadButton onClick={downloadStory}>
        Save for Instagram Story ✨
      </DownloadButton>
    </StoryContainer>
  );
};

export default ShareStory;