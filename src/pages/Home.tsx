import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { Typewriter } from "react-simple-typewriter";
import { FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import HeartBurst from "../components/HeartBurst";

import {
  GlobalStyle,
  Container,
  Starfield,
  Title,
  Subtitle,
  ModalOverlay,
  ModalContent,
  Cake,
  CakeLayer,
  CakeDecorations,
  CakeBaseShadow,
  Candle,
  Flame,
  FlameShape,
  Sparkles,
  Smoke
} from "../styles/StyledComponents";

import {
  FloatingBalloon,
  CountdownTimer,
  calculateCountdown,
  ParticleEffect
} from "../styles/BirthdayComponents";

const BirthdayPage = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [cakeClicked, setCakeClicked] = useState(false);
  const [countdown, setCountdown] = useState('365 days');
  const [activeTab, setActiveTab] = useState<'message' | 'poem'>('message');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [confettiPieces, setConfettiPieces] = useState(150);
  const navigate = useNavigate();
  // Don't auto-play music when component mounts - we'll play it on cake click instead
  useEffect(() => {
    const audio = document.getElementById("birthday-audio") as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.7;
      // Remove autoplay - will play only when cake is clicked
    }
  }, []);
  // Performance optimization: debounced resize handler
  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      
      // Make sure audio is stopped when component unmounts
      const audio = document.getElementById("birthday-audio") as HTMLAudioElement;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    // Set next birthday - this would normally be dynamic
    const nextBirthday = new Date();
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);

    // Update countdown
    const updateCountdown = () => {
      setCountdown(calculateCountdown(nextBirthday));
    };

    // Initial update
    updateCountdown();

    // Update every minute
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);
  const openModal = useCallback(() => {
    setModalOpen(true);
    // Trigger confetti burst when modal opens
    setConfettiPieces(300);
    setTimeout(() => setConfettiPieces(150), 2500);
    // Removed duplicate audio playback here since we already play in handleCandleClick
  }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);  // Candle click effect - show hearts and play music
  const handleCandleClick = useCallback(() => {
    setCakeClicked(true);
    setShowHearts(true);

    // Trigger confetti burst
    setConfettiPieces(400);
    
    // Make sure any previous sounds are stopped
    const stopPreviousSounds = () => {
      const allAudio = document.querySelectorAll('audio');
      allAudio.forEach(audio => {
        if (audio.id !== "birthday-audio") { // Don't stop our main audio yet
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
    
    stopPreviousSounds();
    
    // Start playing the birthday audio when cake is clicked - ONLY SOURCE OF MUSIC
    const audio = document.getElementById("birthday-audio") as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.7;
      audio.currentTime = 0; // Start from beginning
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    
    // Play additional click sound effect with cleanup
    const clickSound = new Audio("/2.mp3");
    clickSound.volume = 0.5;
    clickSound.playbackRate = 1.2;
    
    // Add event listener to clean up click sound when it's done
    clickSound.addEventListener('ended', () => {
      clickSound.src = '';
    });
    
    clickSound.play().catch(error => {
      console.error("Error playing click sound:", error);
    });

    // Create a fun sequence of events
    setTimeout(() => setShowHearts(false), 2000);
    setTimeout(() => setConfettiPieces(200), 3000);

    // Open the modal after a short delay
    setTimeout(openModal, 1200);
  }, [openModal]);

  // Keyboard handling for accessibility
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal();
    }
    if (event.key === 'Escape') {
      closeModal();
    }
  }, [openModal, closeModal]);

  // Generate random balloons
  const generateBalloons = () => {
    const balloonColors = ['#ff9a9e', '#fad0c4', '#ffecd2', '#a1c4fd', '#fbc2eb', '#ffafd7'];
    return Array.from({ length: 10 }).map((_, i) => (
      <FloatingBalloon
        key={i}
        color={balloonColors[Math.floor(Math.random() * balloonColors.length)]}
        left={`${Math.random() * 90 + 5}%`}
        delay={Math.random() * 10}
        size={Math.random() * 30 + 40}
      />
    ));
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Starfield role="presentation" />
        <audio
          id="birthday-audio"
          ref={audioRef}
          src="/happy.mp3"
          loop
          aria-hidden="true"
        />

        {/* Enhanced confetti with more colors and shapes */}
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={confettiPieces}
          gravity={0.15}
          initialVelocityY={-6}
          colors={['#ff9a9e', '#fad0c4', '#ffecd2', '#a1c4fd', '#fbc2eb', '#ffafd7', '#ffd700', '#ffbb33']}
          confettiSource={{
            x: 0,
            y: 0,
            w: windowSize.width,
            h: windowSize.height
          }}
          drawShape={ctx => {
            const shapes = ['heart', 'star', 'circle', 'rect'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            ctx.beginPath();
            if (shape === 'heart') {
              const x = 0, y = 0, width = 15, height = 15;
              ctx.moveTo(x, y + height / 4);
              ctx.quadraticCurveTo(x, y, x + width / 4, y);
              ctx.quadraticCurveTo(x + width / 2, y, x + width / 2, y + height / 4);
              ctx.quadraticCurveTo(x + width / 2, y, x + width * 3 / 4, y);
              ctx.quadraticCurveTo(x + width, y, x + width, y + height / 4);
              ctx.quadraticCurveTo(x + width, y + height / 2, x + width * 3 / 4, y + height * 3 / 4);
              ctx.lineTo(x + width / 2, y + height);
              ctx.lineTo(x + width / 4, y + height * 3 / 4);
              ctx.quadraticCurveTo(x, y + height / 2, x, y + height / 4);
            } else if (shape === 'star') {
              const spikes = 5;
              const outerRadius = 10;
              const innerRadius = 4;
              let rot = Math.PI / 2 * 3;
              let x = 0;
              let y = 0;
              let step = Math.PI / spikes;
              ctx.moveTo(x, y - outerRadius);
              for (let i = 0; i < spikes; i++) {
                x = Math.cos(rot) * outerRadius;
                y = Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                x = Math.cos(rot) * innerRadius;
                y = Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
              }
              ctx.lineTo(0, -outerRadius);
            } else if (shape === 'circle') {
              ctx.arc(0, 0, 5, 0, Math.PI * 2);
            } else {
              ctx.rect(-5, -5, 10, 10);
            }
            ctx.fill();
          }}
        />

        {generateBalloons()}

        <Title
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
          style={{ marginBottom: "1rem" }}
        >
          <Typewriter
            words={["Happy Birthday, Meri Bhen! 🎉"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={90}
            onType={() => {
              const typingSound = new Audio('/src/assets/sounds/typing.mp3');
              typingSound.volume = 0.3;
              typingSound.play().catch(console.error);
            }}
          />
        </Title>

        <div style={{ marginTop: "50px" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: 0.8
            }}
            onClick={handleCandleClick}
            whileHover={!cakeClicked ? {
              scale: 1.03,
              y: -5,
              transition: { duration: 0.3 }
            } : {}}
            style={{ cursor: 'pointer' }}
          >
            <Cake
              aria-label="Birthday cake with candle"
              tabIndex={0}
              onKeyPress={handleKeyPress}
            >
              <CakeLayer />
              <CakeLayer />
              <CakeLayer />
              <CakeDecorations />
              <CakeBaseShadow />
              <Candle style={{ marginLeft: "-20px" }}>
                {!cakeClicked && (
                  <>
                    <Flame>
                      <FlameShape />
                    </Flame>
                    <Sparkles />
                  </>
                )}
                {cakeClicked && <Smoke />}
              </Candle>
            </Cake>
          </motion.div>
        </div>

        <AnimatePresence>
          {showHearts && <HeartBurst />}
        </AnimatePresence>

        <Subtitle
          onClick={handleCandleClick}
          onKeyPress={handleKeyPress}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          tabIndex={0}
          role="button"
          aria-label="Click to open birthday message"
        >
          Make a wish and blow out the candle! 🕯️✨
        </Subtitle>

        <ParticleEffect />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <CountdownTimer className="countdown-timer">
            {countdown}
          </CountdownTimer>
        </motion.div>

        <AnimatePresence>
          {modalOpen && (
            <ModalOverlay
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                style={{
                  width: '80%',
                  maxWidth: '900px',
                  fontFamily: '"Poppins", sans-serif',
                  lineHeight: '1.6',
                  color: '#333',
                }}
              >
                <h2 id="modal-title" style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2.5rem', color: '#FF6F61' }}>
                  Aditi – full-time bandar, part-time drama queen, aur full-power dosti ka engine!
                </h2>

                <div className="message-header">
                  <FaHeart /> Message
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                  <button
                    onClick={() => setActiveTab('message')}
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      background: activeTab === 'message' ? 'linear-gradient(45deg, #FFD700, #FF8C00)' : 'linear-gradient(45deg, #000, #333)',
                      border: '2px solid #FFD700',
                      borderRadius: '5px',
                      color: activeTab === 'message' ? '#000' : '#FFD700',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Message
                  </button>
                  <button
                    onClick={() => setActiveTab('poem')}
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      background: activeTab === 'poem' ? 'linear-gradient(90deg, #FFD700, #FF8C00)' : 'linear-gradient(90deg, #000, #333)',
                      border: '2px solid #FFD700',
                      borderRadius: '5px',
                      color: activeTab === 'poem' ? '#000' : '#FFD700',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Poem
                  </button>
                </div>

                {activeTab === 'message' && (
                  <div className="message-content">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="message-content"
                    >
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Happy Birthday, meri favorite panda-bandari! 🐼🐒<br />
                        Tu lagti hai panda, behave karti hai bandar,<br />
                        par teri hasi, teri masti, aur tera saath priceless hai.<br />
                        9th mein mila tha tujhse, laga ek aur dost mil gayi,<br />
                        par aaj tu meri life ka woh hissa hai, jiske bina sab kuch adhoora lagta hai.<br />

                        Kabhi kabhi irritate karti hai, thoda ladti bhi hai,<br />
                        par teri chhoti chhoti baatein, teri hasi ke woh pal mere liye sabse khaas hain.<br /><br />

                        Tu meri bhen hai — thodi zyada pagal, thodi emotional,<br />
                        par sabse real, aur hamesha saath dene wali.<br /><br />

                        Tera "haat!", tera "shut up!", aur teri pyari si stubbornness,<br />
                        hamari dosti ki asli pehchan hai — jo mujhe hamesha yaad rahegi.<br /><br />

                        Is baar socha simple wish nahi, ek full techy wala birthday gift ho —<br />
                        jo tujhe yaad rahe, aur thoda shock bhi de.<br />
                        Toh le, yeh website — dimaag se nahi, dil se code ki hai. 🎂🎉<br /><br />

                        Bas itna kehna hai:<br />
                        Thoda sudhar ja kabhi, meri baat bhi sun liya kar,<br />
                        par waise hi mast aur pagal reh! 😅<br />
                       
                      </motion.p>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                         Poem mein besti reserved hai... ready ho ja 😈<br />
                      </motion.p>
                    </motion.div>
                  </div>
                )}

                {activeTab === 'poem' && (
                  <div className="poem-content">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="poem-content"
                    >
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
                      >
                        <h2 style={{  fontSize: '2.2rem', color: '#FF6F61', marginBottom: '2rem' }}>
                          Birthday Special: Panda Ki Gatha, Bandar Ka Tamasha 
                        </h2>                        Tu lagti hai panda — cute sa innocent face,<br />
                        Par attitude toh aisa jaise ho koi race!<br />
                        Uchhalti hai har jagah — full-on bandar mode,<br />
                        Tere energy pe NASA bhi kare research code! 🚀<br /><br />

                        Har baat pe kehna "haat," opinion leke phir ignore,<br />
                        Fir end mei kehna "haan theek tha tu" — bas yehi hai tera core!<br />
                        Meri baat pe kabhi bhi seedha haan bolti nahi,<br />
                        Par aakhri mein wahi karti hai, jo maine pehle kahi! 😏<br />                        Ek din bag se book nikaali toh laga crime ho gaya,<br />
                        Tere reaction se laga RAW-CBI active ho gaya!<br />
                        Itna gussa jala diya — mujhe laga main bhar gaya jail,<br />
                        Par tu toh emotions ki factory hai — always full on trail. 📚🫣<br /><br />

                        Paper ball chalake bhi kabhi target pe nahi lagi,<br />
                        Jaise Pakistan ki missiles — hawa mein hi bhatak gayi sabhi!<br />
                        Chimera wali Cold War — pehle bestie, ab "Main toh usse baat bhi nahi karti!"<br />
                        Aur jab bhi tujhe roast karu, bolti "stop it yaar, it hurts me!" 😬🧨<br />                        Aur haan… Aniket ka kya scene hai be? 😏<br />
                        Sabko bolti "my BF," par andar se toh file hi fake hai ye!<br />
                        Privacy level toh Prime Minister jaisa —<br />
                        Par bhai sab jaanta hai — ye toh hai emotional chusa hua aam ka case! 😂📵<br /><br />

                        Topper hai tu, par drama bhi full-time karti hai,<br />
                        Class ke har banday ko confuse kar deti hai.<br />
                        Kabhi karti acting jaise fail ho jaayegi,<br />
                        Par result aata toh sabse pehle full marks le jaayegi! 💯🎭<br />                        Tu irritate karti hai, argue karti hai,<br />
                        Bandar-panda dono roles mein ekdum fit baithi hai.<br />
                        Aur tujhe seriously lena — bhai, impossible mission hai,<br />
                        Tu toh wahi bachi hai jise teacher bhi bolti hai — "beta, tu alag hi vision hai!" 😩📸<br /><br />

                        ❤️ Pyaar Ka Last Shot (Jo tu deserve karti hai)<br />
                        Lekin jo bhi ho, tu hai woh jiske bina masti incomplete hai,<br />
                        Tere bina class, fight, even roast bhi thoda obsolete hai.<br />
                        Tu irritate karti hai, har musibat leke mere paas aati hai,<br />
                        Par tu hi toh hai jisko main sabse zyada special maanta hoon…<br />
                        Bhai nahi, behen he tu — Masti mein keh doon bandar, par tu meri life ka asli fixer hai — fight kare ya naa kare, tu important hai ye clear hai.. 💖🎉
                      </motion.p>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                         💖Happy birthday Meri Pyari Bhen!❤️<br />
                      </motion.p>
                    </motion.div>
                  </div>
                )}                <button                  onClick={() => {
                    if (activeTab === 'message') {
                      setActiveTab('poem');
                    } else if (activeTab === 'poem') {
                      // Stop the audio before navigating
                      const audio = document.getElementById("birthday-audio") as HTMLAudioElement;
                      if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                      }
                      
                      // Pre-load CosmicBlessing before navigation
                      import('./CosmicBlessing')
                        .then(() => {
                          // Navigate after pre-load
                          setTimeout(() => navigate('/cosmic'), 100);
                        })
                        .catch(() => {
                          // If there's an error, navigate anyway
                          navigate('/cosmic');
                        });
                    }
                  }}
                  aria-label={activeTab === 'message' ? "Switch to Poem" : "Proceed to Cosmic Blessing"}
                  className="next-button"
                  style={{
                    padding: '12px 24px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
                    border: 'none',
                    borderRadius: '30px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                  }}
                  onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #feb47b, #ff7e5f)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #ff7e5f, #feb47b)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Next
                </button>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default BirthdayPage;
