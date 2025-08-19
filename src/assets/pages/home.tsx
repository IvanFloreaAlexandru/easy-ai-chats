import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../constants/background/background.tsx";
import "../styles/home.css";
import Navbar from "../components/navbar";

import HoverSound from "../sounds/selectSound.mp3";

const MainPage = () => {
  
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio(HoverSound);
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.3;
    }
  }, []);

  const handleCardHover = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.play();
    }
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="mainpage-container">
      <Background />
      <Navbar />
      
      <div className="content-container">

        <div className="middle-side-main">
          {/* Hero Section */}
          <section className="hero-section fade-in">
            <div className="chess-knight-icon">♞</div>
            <h1 className="hero-title">Chess Master</h1>
            <p className="hero-subtitle">
              Play online, solve puzzles or train with AI.
            </p>
          </section>

          {/* Games Grid */}
          <div className="games-grid fade-in-up">
            {/* Play Online Card */}
            <div
              className="game-card online fade-in-delay"
              onMouseEnter={handleCardHover}
              onClick={() => handleCardClick("/play")}
            >
              <div className="game-card-content">
                <div className="card-icon">🎮</div>
                <h3 className="game-card-title">Play Online</h3>
                <p className="game-card-description">
                  Challenge players from around the world in real-time matches
                </p>
              </div>
            </div>

            {/* Solve Puzzles Card */}
            <div
              className="game-card puzzle fade-in-delay"
              onMouseEnter={handleCardHover}
              onClick={() => handleCardClick("/puzzle")}
            >
              <div className="game-card-content">
                <div className="card-icon">🧩</div>
                <h3 className="game-card-title">Solve Puzzles</h3>
                <p className="game-card-description">
                  Sharpen your tactical skills with challenging chess puzzles
                </p>
              </div>
            </div>

            {/* Train with AI Card */}
            <div
              className="game-card robot fade-in-delay"
              onMouseEnter={handleCardHover}
              onClick={() => handleCardClick("/train")}
            >
              <div className="game-card-content">
                <div className="card-icon">🤖</div>
                <h3 className="game-card-title">Train with AI</h3>
                <p className="game-card-description">
                  Practice against our intelligent AI with adjustable difficulty
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="app-footer fade-in">
            <p className="footer-text">
              © 2025 Chess Master. Built for chess lovers.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
