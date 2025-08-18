import { useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import Background from "../constants/background/background.tsx";
import Menu from "../constants/menu/menu.tsx";
import "../styles/home.css";

import OnlineAnimation from "../animations/online.json";
import PuzzleAnimation from "../animations/puzzle.json";
import RobotAnimation from "../animations/robot.json";
import HoverSound from "../sounds/selectSound.mp3";

const MainPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onlineRef = useRef<Player>(null);
  const puzzleRef = useRef<Player>(null);
  const robotRef = useRef<Player>(null);

  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio(HoverSound);
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.3;
    }
  }, []);

  const handleMouseEnter = (ref: React.RefObject<Player>) => {
    ref.current?.play();
    if (hoverSoundRef.current) {
      hoverSoundRef.current.play();
    }
  };

  const handleMouseLeave = (ref: React.RefObject<Player>) => {
    ref.current?.stop();
    if (hoverSoundRef.current) {
      hoverSoundRef.current.pause();
      hoverSoundRef.current.currentTime = 0;
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
      
      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleMobileMenu}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      />

      <div className="content-container">
        <div className={`left-side-main ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Menu />
        </div>

        <div className="middle-side-main">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">Chess Master</h1>
            <p className="hero-subtitle">
              Experience the ultimate chess platform. Play online, solve puzzles, 
              or challenge our AI. Elevate your game to the next level.
            </p>
          </section>

          {/* Games Grid */}
          <div className="games-grid">
            {/* Online Game Card */}
            <div
              className="game-card online"
              onMouseEnter={() => handleMouseEnter(onlineRef)}
              onMouseLeave={() => handleMouseLeave(onlineRef)}
              onClick={() => handleCardClick("/online")}
            >
              <div className="game-card-content">
                <Player
                  ref={onlineRef}
                  autoplay={false}
                  loop
                  src={OnlineAnimation}
                  className="animation-player"
                />
                <h3 className="game-card-title">Play Online</h3>
                <p className="game-card-description">
                  Challenge players from around the world in real-time matches
                </p>
              </div>
            </div>

            {/* Puzzle Game Card */}
            <div
              className="game-card puzzle"
              onMouseEnter={() => handleMouseEnter(puzzleRef)}
              onMouseLeave={() => handleMouseLeave(puzzleRef)}
              onClick={() => handleCardClick("/puzzle")}
            >
              <div className="game-card-content">
                <Player
                  ref={puzzleRef}
                  autoplay={false}
                  loop
                  src={PuzzleAnimation}
                  className="animation-player"
                />
                <h3 className="game-card-title">Solve Puzzles</h3>
                <p className="game-card-description">
                  Sharpen your tactical skills with challenging chess puzzles
                </p>
              </div>
            </div>

            {/* Robot Game Card */}
            <div
              className="game-card robot"
              onMouseEnter={() => handleMouseEnter(robotRef)}
              onMouseLeave={() => handleMouseLeave(robotRef)}
              onClick={() => handleCardClick("/train")}
            >
              <div className="game-card-content">
                <Player
                  ref={robotRef}
                  autoplay={false}
                  loop
                  src={RobotAnimation}
                  className="animation-player"
                />
                <h3 className="game-card-title">Train with AI</h3>
                <p className="game-card-description">
                  Practice against our intelligent AI with adjustable difficulty
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="app-footer">
            <p className="footer-text">
              © 2024 Chess Master. All rights reserved. Built with passion for chess enthusiasts worldwide. 
              Enhance your strategic thinking and master the royal game.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
