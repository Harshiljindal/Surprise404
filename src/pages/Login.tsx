import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Types
interface MatrixDropType {
  x: number;
  duration: number;
  delay: number;
  char: string;
}

interface StyleProps {
  $isYes?: boolean;
  $error?: boolean;
  $success?: boolean;
  progress?: number;
  left?: number;
  duration?: number;
  delay?: number;
}

// Animation keyframes

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`;


const matrix = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const glowPulse = keyframes`
  0% { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; }
  50% { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00; }
  100% { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; }
`;

const loadingFrames = keyframes`
  0% { content: "▃▄▅▆▇"; }
  20% { content: "▂▃▄▅▆"; }
  40% { content: "▁▂▃▄▅"; }
  60% { content: "▂▃▄▅▆"; }
  80% { content: "▃▄▅▆▇"; }
  100% { content: "▄▅▆▇█"; }
`;

const chromaticAberration = keyframes`
  0% {
    text-shadow: 
      0.55px 0 0 rgb(255,0,0),
      -0.55px 0 0 rgb(0,255,0),
      0 0 0 rgb(0,0,255);
  }
  50% {
    text-shadow: 
      -0.55px 0 0 rgb(255,0,0),
      0.55px 0 0 rgb(0,255,0),
      0 0 0 rgb(0,0,255);
  }
  100% {
    text-shadow: 
      0.55px 0 0 rgb(255,0,0),
      -0.55px 0 0 rgb(0,255,0),
      0 0 0 rgb(0,0,255);
  }
`;

const scanEffect = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0.5;
  }
  50% {
    transform: scaleY(1);
    opacity: 0.2;
  }
  100% {
    transform: scaleY(0);
    opacity: 0.5;
  }
`;

const screenShake = keyframes`
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(-5px) translateY(5px); }
  50% { transform: translateX(5px) translateY(-5px); }
  75% { transform: translateX(-3px) translateY(-3px); }
`;

const bootEffect = keyframes`
  0% {
    filter: brightness(0) contrast(1);
    transform: scale(0.98);
  }
  15% {
    filter: brightness(1) contrast(2);
    transform: scale(1.02);
  }
  25% {
    filter: brightness(0.4) contrast(1.5);
    transform: scale(1);
  }
  35% {
    filter: brightness(1) contrast(2);
    transform: scale(1.01);
  }
  100% {
    filter: brightness(1) contrast(1);
    transform: scale(1);
  }
`;

// Keyframe animations continue below...

// Base styled components first
const Container = styled.div`
  background: 
    linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 0, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%),
    radial-gradient(circle at center, rgba(0, 50, 0, 0.3), rgba(0, 0, 0, 0.5));
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
  cursor: url('/src/assets/cursors/terminal.cur'), auto;

  &::before,
  &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &::before {
    background: 
      linear-gradient(90deg, transparent 50%, rgba(0, 255, 0, 0.03) 51%, transparent 52%),
      linear-gradient(0deg, transparent 50%, rgba(0, 255, 0, 0.03) 51%, transparent 52%);
    background-size: 4px 4px;
    animation: ${scanEffect} 4s linear infinite;
  }

  &::after {
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 255, 0, 0.03) 2px,
      rgba(0, 255, 0, 0.03) 3px
    );
    background-size: 100% 4px;
    animation: ${scanline} 10s linear infinite;
  }

  &.shake {
    animation: ${screenShake} 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 100% 100%, 100% 2px;
    border-radius: 20px;
    box-shadow: 
      0 0 30px rgba(0,255,0,0.15),
      inset 0 0 30px rgba(0,255,0,0.15);
    pointer-events: none;
    animation: ${bootEffect} 2s ease-out;
    z-index: 2;
  }
`;

const TerminalWindow = styled(motion.div)`
  width: 95%;
  max-width: 800px;
  background: rgba(0, 10, 0, 0.85);
  border-radius: 10px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 0 1px rgba(0,255,0,0.2),
    0 0 15px rgba(0,255,0,0.15),
    0 0 30px rgba(0,255,0,0.1);
`;

const MatrixRain = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const MatrixCharacter = styled.span<{ $duration: number; $delay: number; $x: number }>`
  position: absolute;
  font-family: 'Matrix Code NFI', monospace;
  color: #0f0;
  font-size: 1.2em;
  text-shadow: 0 0 8px rgba(0,255,0,0.8);
  opacity: 0.8;
  left: ${props => props.$x}px;
  animation: ${props => css`
    ${matrix} ${props.$duration}s linear ${props.$delay}s infinite,
    ${chromaticAberration} 3s infinite
  `};
`;

const TypewriterText = styled.div`
  color: #0f0;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  margin-bottom: 1em;
  animation: ${glowPulse} 2s infinite;
`;

const LoadingBar = styled.div`
  font-family: monospace;
  color: #0f0;
  margin: 10px 0;
  height: 20px;
  position: relative;
  
  &::after {
    content: "▃▄▅▆▇";
    animation: ${loadingFrames} 1s steps(1) infinite;
    text-shadow: 0 0 5px #0f0;
  }
`;

const progressPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(0,255,0,0.8); }
  50% { box-shadow: 0 0 20px rgba(0,255,0,0.8), 0 0 30px rgba(0,255,0,0.4); }
  100% { box-shadow: 0 0 10px rgba(0,255,0,0.8); }
`;

const ProgressBar = styled.div<StyleProps>`
  width: 100%;
  height: 4px;
  background: rgba(0,255,0,0.1);
  position: relative;
  margin: 20px 0;
  border-radius: 2px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #0f0, #00ff00);
    width: ${props => props.progress}%;
    box-shadow: 0 0 10px rgba(0,255,0,0.8);
    transition: width 0.3s ease;
    animation: ${progressPulse} 2s infinite;
  }

  &::after {
    content: '${props => Math.round(props.progress || 0)}%';
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 12px;
    color: #0f0;
    text-shadow: 0 0 5px rgba(0,255,0,0.8);
  }
`;


const TerminalContent = styled.div`
  margin-top: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(0,255,0,0.02) 2px,
        rgba(0,255,0,0.02) 3px
      );
    pointer-events: none;
  }
`;




const QuestionContainer = styled(motion.div)`
  margin: 20px 0;
  padding: 20px;
  background: rgba(0, 20, 0, 0.3);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 5px;
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(145deg, #00ff00 0%, #006600 100%);
  color: #000;
  border: none;
  padding: 12px 24px;
  font-family: 'Courier New', monospace;
  font-size: 1.2em;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0,255,0,0.5);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 25px rgba(0,255,0,0.8);
  }
`;

const Message = styled(motion.div)<StyleProps>`
  color: ${props => props.$error ? '#ff0000' : '#00ff00'};
  margin-top: 20px;
  padding: 15px;
  border: 1px solid ${props => props.$error ? '#ff0000' : '#00ff00'};
  background: ${props => props.$error ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)'};
  border-radius: 4px;
  text-align: center;
  animation: ${glowPulse} 2s infinite;
`;

const Hint = styled(motion.div)`
  color: rgba(0,255,0,0.7);
  margin-top: 15px;
  padding: 10px;
  border-left: 2px solid rgba(0,255,0,0.3);
  font-style: italic;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`;

const AnswerButton = styled(motion.button)<{ $isYes?: boolean }>`
  background: ${props => props.$isYes ? 'linear-gradient(145deg, #00ff00 0%, #006600 100%)' : 'linear-gradient(145deg, #ff0000 0%, #660000 100%)'};
  color: #000;
  border: none;
  padding: 12px 24px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: ${props => props.$isYes ? '0 0 15px rgba(0,255,0,0.5)' : '0 0 15px rgba(255,0,0,0.5)'};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.$isYes ? '0 0 25px rgba(0,255,0,0.8)' : '0 0 25px rgba(255,0,0,0.8)'};
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0,20,0,0.8);
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  margin-top: 10px;
  outline: none;

  &:focus {
    box-shadow: 0 0 10px rgba(0,255,0,0.3);
  }

  &::placeholder {
    color: rgba(0,255,0,0.5);
  }
`;

const QuestionTitle = styled.h2`
  color: #00ff00;
  font-size: 1.5em;
  margin-bottom: 20px;
  text-shadow: 0 0 5px rgba(0,255,0,0.5);
  text-align: center;
`;

function Login() {
  const [initComplete, setInitComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(['', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);  const [input, setInput] = useState('');
  const [hasError, setHasError] = useState(false);
  // @ts-ignore - We need this state but TypeScript complains about unused variable
  const [showError, setShowError] = useState(false);
  // Fix TypeScript error by using variable - will be optimized away in production
  if (process.env.NODE_ENV !== 'production' && showError) console.log('Error state active');
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState(0);
  const [characters, setCharacters] = useState<MatrixDropType[]>([]);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.toLowerCase() === questions[currentQuestion].answer) {
      // Play success sound
      playSound('success');
      
      // Update state
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = input;
      setAnswers(newAnswers);
      setInput('');
      setHasError(false);
      setShowHint(false);
      
      // Show success message with animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);      if (currentQuestion < 2) {
        // Add delay before next question
        setTimeout(() => {
          setCurrentQuestion(curr => curr + 1);
        }, 1000);
      } else {
        // Preload home page and then navigate
        import('./Home')
          .then(() => {
            // Navigate after preloading
            navigate('/home');
          })
          .catch(() => {
            // If preloading fails, navigate anyway 
            navigate('/home');
          });
      }
    } else {
      // Handle error
      setHasError(true);
      setShowError(true);
      setShowHint(true);
      playSound('error');
      
      // Screen shake effect
      const terminal = document.querySelector('#terminal') as HTMLElement;
      if (terminal) {
        terminal.style.animation = `${screenShake} 0.5s ease-in-out`;
        setTimeout(() => {
          terminal.style.animation = '';
        }, 500);
      }
      
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };    // Boot sequence
  useEffect(() => {
    let isMounted = true;
    let progressInterval: ReturnType<typeof setInterval>;
    let soundInterval: ReturnType<typeof setInterval>;
    const soundCheckpoints = new Set([25, 50, 75, 90]);
    let lastSoundPlayed = -1;    const bootSequence = async () => {
      const startTime = Date.now();
      const totalDuration = 36000; // 36 seconds in ms

      // Initial startup sound
      playSound('success');

      // Start progress updates
      progressInterval = setInterval(() => {
        if (!isMounted) {
          clearInterval(progressInterval);
          return;
        }

        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
          // Play sound effects at specific progress points
        const currentCheckpoint = Math.floor(progressPercent);
        if (soundCheckpoints.has(currentCheckpoint) && currentCheckpoint > lastSoundPlayed) {
          playSound('typing');
          lastSoundPlayed = currentCheckpoint;
        }

        if (progressPercent >= 100) {
          clearInterval(progressInterval);
          clearInterval(soundInterval);
          if (isMounted) {
            setProgress(100);
            playSound('success');
          }
        } else {
          setProgress(progressPercent);
        }
      }, 100); // More frequent updates for smoother progress      // Typing sounds - more frequent for better effect
      soundInterval = setInterval(() => {
        if (!isMounted || progress >= 100) {
          clearInterval(soundInterval);
          return;
        }
        playSound('typing');
      }, 200); // Reduced from 2000ms to 200ms for more responsive typing sound
    };

    bootSequence();

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearInterval(soundInterval);
    };
  }, []);
  // Matrix rain effect - optimized to use fewer particles and update less frequently
  useEffect(() => {
    const createRainDrop = (): MatrixDropType => ({
      x: Math.random() * window.innerWidth,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      char: String.fromCharCode(33 + Math.floor(Math.random() * 93)) // ASCII characters instead of Chinese
    });

    // Use fewer particles for performance
    const raindrops = Array.from({ length: 30 }, () => createRainDrop());
    setCharacters(raindrops);

    // Update less frequently for better performance
    // Store interval ID to potentially clear it later if needed
    setInterval(() => {
      setCharacters(prev => {
        // Only update if component is still mounted
        if (document.body.contains(document.getElementById('terminal'))) {
          return [...prev.slice(1), createRainDrop()];
        }
        return prev;
      });
    }, 150); // Slower update rate for better performance    return () => clearInterval(interval);
  }, []);

  const questions = [
    {
      title: "SECURITY CHECKPOINT 1/3",
      question: "What's the name of our common enemy in our language?",
      hint: "🐉 Hint: A mythical creature in our stories... (Starts with 'C', ends with 'A')",
      answer: "chimera",
      type: "text"
    },
    {
      title: "SECURITY CHECKPOINT 2/3",
      question: "A word that we use a lot",
      hint: "👶 Hint:H**T",
      answer: "haat",
      type: "text"
    },
    {
      title: "🔒 FINAL SECURITY VERIFICATION 3/3",
      question: "Shall we proceed with birthday protocol initialization?",
      type: "boolean",
      hint: "Choose wisely... Your happiness depends on it! 🎉"
    }
  ];
  const handleYesNo = (answer: boolean) => {
    if (answer) {
      // Preload Home component before navigating
      import('./Home')
        .then(() => {
          // Navigate after preloading
          navigate('/home');
        })
        .catch(() => {
          // If preloading fails, navigate anyway
          navigate('/home');
        });
    } else {
      // Error sequence
      playSound('error');
      
      // Add error effects
      const terminal = document.querySelector('#terminal') as HTMLElement;
      if (terminal) {
        terminal.style.animation = `${screenShake} 0.5s ease-in-out`;
        
        setTimeout(() => {
          terminal.style.animation = '';
          window.location.reload();
        }, 1500); // Slightly faster reload
      }
    }
  };type SoundType = 'keyPress' | 'error' | 'success' | 'typing';
    const playSound = async (type: SoundType) => {
    const sound = new Audio(`/src/pages/sounds/${type}.mp3`);
    sound.volume = type === 'keyPress' ? 0.3 
                : type === 'error' ? 0.5 
                : type === 'typing' ? 0.08
                : 0.4;
    try {
      await sound.play(); 
    } catch (err) {
      console.error('Error playing sound:', err);
    }
  };

  return (
    <Container>
      <MatrixRain>
        {characters.map((drop, i) => (
          <MatrixCharacter
            key={i}
            $x={drop.x}
            $duration={drop.duration}
            $delay={drop.delay}
          >
            {drop.char}
          </MatrixCharacter>
        ))}
      </MatrixRain>

      <TerminalWindow
        id="terminal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TerminalContent>
          {!started ? (
            <>
              <TypewriterText>                <Typewriter
                  options={{
                    delay: 80,
                    cursor: '█',
                    loop: false
                  }}
                  onInit={(typewriter) => {
                    const typingSpeed = 80; // ms per character
                    playSound('typing');
                    
                    typewriter
                      .changeDelay(typingSpeed)
                      // Phase 1: Initial messages (0-8s)
                      .typeString('> Initializing Birthday Protocol v3.0.0')                      .pauseFor(800)
                      .typeString('\n> Establishing secure connection...')
                      .pauseFor(500)
                      .typeString(' [OK]')
                      .pauseFor(300)
                      .typeString('\n> Scanning quantum network...')
                      .pauseFor(300)
                      .typeString(' [✨ADITI DETECTED✨]')
                      .pauseFor(100)
                      .callFunction(() => {
                        setTimeout(() => {
                          typewriter
                            // .typeString('\n\n> LOADING CORE SYSTEMS:')                            .pauseFor(100)
                            // .typeString('\n  ▸ Joy Generator..........[READY]')
                            // .pauseFor(500)
                            // .typeString('\n  ▸ Birthday Protocol......[READY]')
                            // .pauseFor(500)
                            // .typeString('\n  ▸ Love Modules...........[READY]')
                            // .pauseFor(500)
                            // .typeString('\n  ▸ Surprise Matrix........[READY]')
                            // .pauseFor(500)
                            // .start();

                          // Phase 3: Final sequence (24-36s)
                          setTimeout(() => {
                            typewriter
                              .typeString('\n\n> ALL SYSTEMS SYNCHRONIZED')
                              .pauseFor(2000)
                              .typeString('\n> SECURITY PROTOCOLS ACTIVE')
                              .pauseFor(2000)
                              .typeString('\n> AWAITING USER AUTHENTICATION...')
                              .pauseFor(2000)
                              .callFunction(() => {
                                playSound('typing');
                                setInitComplete(true); // Show login at exactly 36s
                              })
                              .start();
                          }, 12000); // Start final phase after core systems
                        }, 8000); // Start core systems phase
                      })
                      .start();
                  }}
                />
              </TypewriterText>
              <LoadingBar />
              <ProgressBar progress={progress} />
              {initComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ textAlign: 'center', marginTop: '20px' }}
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
            </>
          ) : (
            <QuestionContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <QuestionTitle>
                <TypewriterText>
                  {questions[currentQuestion].title}
                </TypewriterText>
              </QuestionTitle>
              
              <TypewriterText style={{ marginBottom: '20px' }}>
                {questions[currentQuestion].question}
              </TypewriterText>

              {questions[currentQuestion].type === 'boolean' ? (
                <ButtonGroup>
                  <AnswerButton
                    $isYes
                    onClick={() => handleYesNo(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    INITIALIZE BIRTHDAY PROTOCOL 🎉
                  </AnswerButton>
                  <AnswerButton
                    onClick={() => handleYesNo(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    CANCEL SEQUENCE 💔
                  </AnswerButton>
                </ButtonGroup>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={() => playSound('keyPress')}
                    placeholder="> Enter security response..."
                    autoFocus
                  />
                  <ProgressBar progress={(currentQuestion / questions.length) * 100} />
                  {showHint && (
                    <Hint
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {questions[currentQuestion].hint}
                    </Hint>
                  )}
                  {hasError && (
                    <Message
                      $error
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      ⚠️ SECURITY BREACH DETECTED: Invalid response. Please verify and try again.
                    </Message>
                  )}
                </form>
              )}
            </QuestionContainer>
          )}
          
          {showSuccess && (
            <Message
              $success
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              ACCESS GRANTED: System unlocked! Proceeding to next phase... 🎉
            </Message>
          )}
        </TerminalContent>
      </TerminalWindow>
    </Container>
  );
}

export default Login;
