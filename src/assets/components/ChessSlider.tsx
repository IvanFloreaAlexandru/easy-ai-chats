import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Pentru integrarea în LoginPage
interface ChessSliderProps {
  Background?: React.ComponentType;
  Navbar?: React.ComponentType;
}

const ChessSlider: React.FC<ChessSliderProps> = ({ Background, Navbar }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "The Pawn",
      number: "01.",
      description: "Each side has 8 Pawns",
      image: "images/pawn.png", // Înlocuiește cu path-ul imaginii tale
      viewText: "View White"
    },
    {
      id: 2,
      title: "The Knight",
      number: "02.",
      description: "Each side has 2 Knights",
      image: "images/knight.png", // Înlocuiește cu path-ul imaginii tale
      viewText: "View Black"
    },
    {
      id: 3,
      title: "The Bishop",
      number: "03.",
      description: "Each side has 2 Bishops",
      image: "images/bishop.png", // Înlocuiește cu path-ul imaginii tale
      viewText: "View White"
    },
    {
      id: 4,
      title: "The Rook",
      number: "04.",
      description: "Each side has 2 Rooks",
      image: "images/rook.png", // Înlocuiește cu path-ul imaginii tale
      viewText: "View Black"
    },
    {
      id: 5,
      title: "The Queen",
      number: "05.",
      description: "Each side has 1 Queen",
      image: "images/queen.png", // Înlocuiește cu path-ul imaginii tale
      viewText: "View White"
    },
    {
      id: 6,
      title: "The King",
      number: "06.",
      description: "Each side has 1 King",
      image: "images/king.png", // Înlocuiește cu path-ul imaginii tale
      viewText: "View Black"
    }
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getPrevSlide = () => {
    return slides[(currentSlide - 1 + slides.length) % slides.length];
  };

  const getNextSlide = () => {
    return slides[(currentSlide + 1) % slides.length];
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Component */}
      {Background && <Background />}
      
      {/* Navbar */}
      {Navbar && <Navbar />}
      
      {/* Main Slider Content */}
      <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-7xl mx-auto relative">
        
        {/* Main Content Container */}
        <div className="flex items-center justify-between h-96">
          
          {/* Left Side - Previous Slide */}
          <div 
            className="flex-1 flex flex-col items-start justify-center cursor-pointer opacity-50 hover:opacity-70 transition-opacity duration-300"
            onClick={prevSlide}
          >
            <div className="text-blue-400 text-lg font-medium mb-2">
              {getPrevSlide().number}
            </div>
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
              {getPrevSlide().title}
            </h2>
            <p className="text-gray-300 text-lg">
              {getPrevSlide().description}
            </p>
          </div>

          {/* Center - Current Slide Image */}
          <div className="flex-1 flex flex-col items-center justify-center mx-8">
            <div className="relative">
              {/* Chess Piece Display */}
              <div className="w-512 h-512 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img 
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-512 h-512 object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    // Fallback dacă imaginea nu se încarcă
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    if (img.nextSibling && img.nextSibling instanceof HTMLElement) {
                      (img.nextSibling as HTMLElement).style.display = 'block';
                    }
                  }}
                />
                {/* Fallback text dacă imaginea nu se încarcă */}
                <div className="text-8xl text-amber-900 filter drop-shadow-lg hidden">
                  {slides[currentSlide].title.split(' ')[1]?.charAt(0) || '?'}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
  onClick={prevSlide}
  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-white/50 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300"
>
  <ChevronLeft className="w-6 h-6 text-white" />
</button>

<button
  onClick={nextSlide}
  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300"
>
  <ChevronRight className="w-6 h-6 text-white" />
</button>
            </div>
          </div>

          {/* Right Side - Next Slide */}
          <div 
            className="flex-1 flex flex-col items-end justify-center cursor-pointer opacity-50 hover:opacity-70 transition-opacity duration-300 text-right"
            onClick={nextSlide}
          >
            <div className="text-blue-400 text-lg font-medium mb-2">
              {getNextSlide().number}
            </div>
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
              {getNextSlide().title}
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              {getNextSlide().description}
            </p>
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2">
              {getNextSlide().viewText}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChessSlider;