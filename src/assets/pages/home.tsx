import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../constants/background/background.tsx";
import "../styles/home.css";
import Navbar from "../components/navbar";

import HoverSound from "../sounds/selectSound.mp3";

const MainPage = () => {
  const navigate = useNavigate();
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio(HoverSound);
    if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.3;
  }, []);

  const handleCardHover = () => {
    if (hoverSoundRef.current) hoverSoundRef.current.play();
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mainpage-container ">
      <Background />
      <Navbar />

      <div className="content-container">

        <div className="middle-side-main">
          {/* Hero Section */}
          <section className="hero-section fade-in bg-gray-800 rounded-3xl shadow-md p-10 text-center text-white">
            <div className="chess-knight-icon text-6xl mb-4 animate-bounce">♞</div>
            <h1 className="hero-title text-4xl font-bold mb-2 tracking-wide">Chess Master</h1>
            <p className="hero-subtitle text-lg opacity-90">
              Play online, solve puzzles or train with AI.
            </p>
          </section>

          {/* Games Grid */}
          <div className="games-grid fade-in-up grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            
            {/* Play Online Card */}
            <div
              className="game-card online transform transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gray-800 rounded-2xl p-6 cursor-pointer text-white"
              onMouseEnter={handleCardHover}
              onClick={() => handleCardClick("/play")}
            >
              <div className="game-card-content text-center">
                <div className="card-icon text-4xl mb-3">🎮</div>
                <h3 className="game-card-title text-2xl font-semibold mb-2">Play Online</h3>
                <p className="game-card-description text-sm opacity-80">
                  Challenge players from around the world in real-time matches
                </p>
              </div>
            </div>

            {/* Solve Puzzles Card */}
            <div
              className="game-card puzzle transform transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gray-800 rounded-2xl p-6 cursor-pointer text-white"
              onMouseEnter={handleCardHover}
              onClick={() => handleCardClick("/puzzle")}
            >
              <div className="game-card-content text-center">
                <div className="card-icon text-4xl mb-3">🧩</div>
                <h3 className="game-card-title text-2xl font-semibold mb-2">Solve Puzzles</h3>
                <p className="game-card-description text-sm opacity-80">
                  Sharpen your tactical skills with challenging chess puzzles
                </p>
              </div>
            </div>

            {/* Train with AI Card */}
            <div
              className="game-card robot transform transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gray-800 rounded-2xl p-6 cursor-pointer text-white"
              onMouseEnter={handleCardHover}
              onClick={() => handleCardClick("/train")}
            >
              <div className="game-card-content text-center">
                <div className="card-icon text-4xl mb-3">🤖</div>
                <h3 className="game-card-title text-2xl font-semibold mb-2">Train with AI</h3>
                <p className="game-card-description text-sm opacity-80">
                  Practice against our intelligent AI with adjustable difficulty
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <footer className="app-footer fade-in mt-12 text-center">
            <p className="footer-text text-white opacity-70">
              © 2025 Chess Master. Built for chess lovers.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
