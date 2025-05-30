import { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import { motion, AnimatePresence } from 'framer-motion';

// Animation keyframes
const glitch = keyframes`
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
  40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
  60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
  80% { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
  100% { transform: translate(0); filter: hue-rotate(0deg); }
`;

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`;

const flicker = keyframes`
  0% { opacity: 0.8; }
  5% { opacity: 0.85; }
  10% { opacity: 0.9; }
  15% { opacity: 0.85; }
  20% { opacity: 0.95; }
  25% { opacity: 0.85; }
  30% { opacity: 0.9; }
  35% { opacity: 1; }
  40% { opacity: 0.95; }
  45% { opacity: 0.85; }
  50% { opacity: 0.9; }
  55% { opacity: 0.95; }
  60% { opacity: 0.9; }
  65% { opacity: 0.85; }
  70% { opacity: 0.95; }
  75% { opacity: 0.9; }
  80% { opacity: 1; }
  85% { opacity: 0.95; }
  90% { opacity: 0.85; }
  95% { opacity: 0.9; }
  100% { opacity: 0.95; }
`;

const matrix = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const terminalBoot = keyframes`
  0% { transform: scale(1); filter: brightness(1); }
  2% { transform: scale(1.02); filter: brightness(1.5); }
  4% { transform: scale(0.98); filter: brightness(0.8); }
  6% { transform: scale(1.02); filter: brightness(1.2); }
  8% { transform: scale(0.99); filter: brightness(0.9); }
  10% { transform: scale(1); filter: brightness(1); }
`;

const heartbreak = keyframes`
  0% { transform: scale(1); }
  10% { transform: scale(1.2); }
  20% { transform: scale(0.9); }
  30% { transform: scale(1.1); }
  40% { transform: scale(0.95); }
  50% { transform: scale(1); filter: hue-rotate(0deg); }
  60% { transform: scale(1) rotate(5deg); filter: hue-rotate(90deg); }
  70% { transform: scale(1) rotate(-5deg); filter: hue-rotate(180deg); }
  80% { transform: scale(0.9) rotate(5deg); filter: hue-rotate(270deg); }
  90% { transform: scale(0.8) rotate(-5deg); filter: hue-rotate(360deg); }
  100% { transform: scale(0.7); opacity: 0; }
`;

const Container = styled.div`
  background: radial-gradient(ellipse at center, #0a1922 0%, #000000 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(rgba(0,30,0,0.3) 50%, rgba(0,0,0,0.3) 50%),
      linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
    animation: ${scanline} 10s linear infinite;
    z-index: 2;
  }
`;

const MatrixBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 255, 0, 0.1) 50%
    );
    background-size: 100% 4px;
    animation: ${flicker} 0.15s infinite;
  }
`;

const Terminal = styled(motion.div)`
  width: 95%;
  max-width: 800px;
  height: 80vh;
  background-color: rgba(0, 20, 0, 0.85);
  padding: 30px;
  border: 2px solid #00ff00;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3),
              inset 0 0 40px rgba(0, 255, 0, 0.1);
  position: relative;
  z-index: 2;
  overflow-y: auto;
  animation: ${terminalBoot} 2s ease-out;
  
  &::before {
    content: "TERMINAL v2.5.0 - BIRTHDAY PROTOCOL";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    background: rgba(0, 255, 0, 0.1);
    border-bottom: 1px solid #00ff00;
    font-size: 0.8em;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 4px;
  }
`;

const StartButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 10px 20px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 0, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const Hint = styled(motion.div)`
  color: #ffd700;
  font-size: 0.9em;
  margin-top: 10px;
  opacity: 0.8;
`;

const QuestionContainer = styled(motion.div)`
  margin-top: 20px;
  padding: 10px;
  border-left: 2px solid #00ff00;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 0, 0.2) 50%,
      transparent 100%
    );
    animation: ${glitch} 0.2s ease-in-out infinite;
    opacity: 0.5;
    pointer-events: none;
  }
`;

const QuestionTitle = styled(motion.div)`
  font-size: 1.2em;
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
  margin-bottom: 15px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const AnswerButton = styled(motion.button)<{ $isYes?: boolean }>`
  background: transparent;
  border: 2px solid ${props => props.$isYes ? '#00ff00' : '#ff0000'};
  color: ${props => props.$isYes ? '#00ff00' : '#ff0000'};
  padding: 10px 30px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.$isYes ? 
      'rgba(0, 255, 0, 0.1)' : 
      'rgba(255, 0, 0, 0.1)'};
    box-shadow: 0 0 10px ${props => props.$isYes ? 
      'rgba(0, 255, 0, 0.5)' : 
      'rgba(255, 0, 0, 0.5)'};
  }
`;

const HeartIcon = styled(motion.div)`
  font-size: 48px;
  color: #ff0000;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #00ff00;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  width: 100%;
  margin: 10px 0;
  padding: 5px 10px;
  outline: none;
  position: relative;
  transition: all 0.3s ease;

  &:focus {
    border-bottom: 2px solid #00ff00;
    box-shadow: 0 4px 8px rgba(0, 255, 0, 0.2);
    background: rgba(0, 255, 0, 0.05);
  }

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`;

const Message = styled(motion.div)<{ $error?: boolean; $success?: boolean }>`
  color: ${props => props.$error ? '#ff0000' : props.$success ? '#00ff00' : '#00ff00'};
  margin: 10px 0;
  font-weight: ${props => props.$success ? 'bold' : 'normal'};
  text-shadow: 0 0 5px ${props => props.$error ? '#ff0000' : '#00ff00'};
  animation: ${props => props.$error || props.$success ? glitch : 'none'} 0.3s infinite;
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 8px;
  &::before {
    content: '>';
  }
`;

const Login: React.FC = () => {
  const [initComplete, setInitComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(['', '', '']);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [input, setInput] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      title: "What's the name of our secret enemy in our language?",
      question: "",
      hint: "🐉 Hint: A mythical dragon we laugh about. Starts with 'C', ends with 'a'.",
      answer: "chimera",
      type: "text"
    },
    {
      title: "What's a common word that we both use a lot?",
      question: "",
      hint: "👶 Hint: H*a*",
      answer: "haat",
      type: "text"
    },
    {
      title: "💝 Q3 — The Final Test",
      question: "Are you excited for your birthday surprise?",
      type: "boolean"
    }
  ];

  const correctAnswers = ['chimera', 'haat', 'my brother is best'];

  useEffect(() => {
    // Load sound effects
    const sounds = {
      keyPress: new Howl({
        src: ['/src/assets/sounds/typewriter.mp3'],
        volume: 0.3
      }),
      error: new Howl({
        src: ['/src/assets/sounds/error.mp3'],
        volume: 0.5
      }),
      success: new Howl({
        src: ['/src/assets/sounds/success.mp3'],
        volume: 0.4
      })
    };

    return () => {
      // Cleanup sounds
      Object.values(sounds).forEach(sound => sound.unload());
    };
  }, []);

  const playSound = useCallback((type: 'keyPress' | 'error' | 'success') => {
    const sound = new Howl({
      src: [`/src/assets/sounds/${type}.mp3`],
      volume: type === 'keyPress' ? 0.3 : type === 'error' ? 0.5 : 0.4
    });
    sound.play();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.toLowerCase() === correctAnswers[currentQuestion]) {
      playSound('success');
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = input;
      setAnswers(newAnswers);
      setInput('');
      setHasError(false);
      setShowHint(false);

      if (currentQuestion < 2) {
        setCurrentQuestion(curr => curr + 1);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      }
    } else {
      setHasError(true);
      setShowError(true);
      setShowHint(true);
      playSound('error');
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleYesNo = (answer: boolean) => {
    if (answer) {
      playSound('success');
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } else {
      playSound('error');
      setShowError(true);
      // Show heartbreak animation
      const terminal = document.querySelector('#terminal');
      if (terminal) {
        terminal.classList.add('heartbreak');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  const handleKeyPress = () => {
    playSound('keyPress');
  };

  const questionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Container>
      <MatrixBackground />
      <Terminal
        id="terminal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .changeDelay(60)
              .typeString('> INITIALIZING BIRTHDAY PROTOCOL v2.5.0')
              .pauseFor(1000)
              .typeString('\n\n> ESTABLISHING SECURE CONNECTION...')
              .pauseFor(800)
              .typeString('\n> SCANNING NETWORK...')
              .pauseFor(600)
              .typeString('\n> DETECTED: SPECIAL GUEST - ADITI')
              .pauseFor(500)
              .typeString('\n> ACTIVATING BIRTHDAY SECURITY MEASURES')
              .pauseFor(500)
              .typeString('\n> LOADING SURPRISE MODULES...')
              .pauseFor(700)
              .typeString('\n> CONFIGURING BIRTHDAY PARAMETERS...')
              .pauseFor(600)
              .typeString('\n> GENERATING HAPPINESS ALGORITHMS...')
              .pauseFor(500)
              .typeString('\n> CALIBRATING JOY LEVELS...')
              .pauseFor(800)
              .typeString('\n\n> INITIALIZATION COMPLETE')
              .pauseFor(500)
              .typeString('\n> WAITING FOR USER INPUT...')
              .callFunction(() => setInitComplete(true))
              .start();
          }}
          options={{
            cursor: '▋',
            cursorBlink: true
          }}
        />

        <AnimatePresence mode="wait">
          {initComplete && !started && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <StartButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStarted(true);
                  playSound('keyPress');
                }}
              >
                LOGIN TO SYSTEM
              </StartButton>
            </motion.div>
          )}

          {started && !showSuccess && (
            <QuestionContainer
              initial="hidden"
              animate="visible"
              variants={questionVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <QuestionTitle>
                {questions[currentQuestion].title}
              </QuestionTitle>

              {questions[currentQuestion].type === 'boolean' ? (
                <>
                  <Message>
                    <Prompt />{questions[currentQuestion].question}
                  </Message>
                  <ButtonGroup>
                    <AnswerButton
                      $isYes
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleYesNo(true)}
                    >
                      YES! 🎉
                    </AnswerButton>
                    <AnswerButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleYesNo(false)}
                    >
                      NO 💔
                    </AnswerButton>
                  </ButtonGroup>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Message>
                    <Prompt />{questions[currentQuestion].question}
                  </Message>
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="> Enter your response..."
                    autoFocus
                  />
                </form>
              )}
              
              {showHint && questions[currentQuestion].type === 'text' && (
                <Hint
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {questions[currentQuestion].hint}
                </Hint>
              )}
            </QuestionContainer>
          )}

          {showError && (
            <>
              <Message
                $error
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Prompt />
                {currentQuestion === 2 
                  ? "CRITICAL ERROR: BIRTHDAY SPIRIT NOT DETECTED 💔"
                  : "ACCESS DENIED: SECURITY BREACH DETECTED"}
              </Message>
              {currentQuestion === 2 && (
                <HeartIcon
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: 0,
                    rotate: 360,
                    opacity: 0
                  }}
                  transition={{ duration: 2 }}
                >
                  💔
                </HeartIcon>
              )}
            </>
          )}

          {showSuccess && (
            <Message
              $success
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Prompt />ACCESS GRANTED: WELCOME HOME, BIRTHDAY GIRL! 🎉
            </Message>
          )}
        </AnimatePresence>
      </Terminal>
    </Container>
  );
};

export default Login;
