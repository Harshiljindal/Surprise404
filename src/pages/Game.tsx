import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #7F7FD5, #86A8E7, #91EAE4);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 600px;
  width: 100%;
  margin: 20px auto;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)<{ $isFlipped: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.$isFlipped ? '#fff' : '#2a2a72'};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ScoreBoard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  border-radius: 20px;
  font-size: 1.2rem;
  margin: 20px 0;
`;

const WinMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  color: #333;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const emojis = ['🎂', '🎈', '🎁', '🎊', '🎉', '🎨', '🎭', '🎪'];
const createDeck = () => [...emojis, ...emojis]
  .sort(() => Math.random() - 0.5)
  .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));

const Game = () => {
  const [cards, setCards] = useState(createDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map((card, idx) => 
          idx === first || idx === second
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(m => m + 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setScore(s => s + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matches === emojis.length) {
      setIsGameComplete(true);
    }
  }, [matches]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      cards[index].isMatched
    ) return;

    setFlippedCards(prev => [...prev, index]);
  };

  return (
    <Container>
      <h1>Birthday Memory Game 🎮</h1>
      <ScoreBoard>
        Moves: {score} | Matches: {matches}/{emojis.length}
      </ScoreBoard>
      
      <GameBoard>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            $isFlipped={flippedCards.includes(index) || card.isMatched}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {(flippedCards.includes(index) || card.isMatched) && card.emoji}
          </Card>
        ))}
      </GameBoard>

      <AnimatePresence>
        {isGameComplete && (
          <WinMessage
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2>🎉 You're the Birthday Champion! 🎉</h2>
            <p>You completed the game in {score} moves!</p>
          </WinMessage>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Game;
