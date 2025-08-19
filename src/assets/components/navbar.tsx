import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Phone, BookOpen, RefreshCw, LogOut, Menu, X } from "lucide-react";
import HoverSound from "../sounds/selectSound.mp3";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  const navItems = [
    { name: "Learn", icon: BookOpen, path: "/tutorial" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "About us", icon: Home, path: "/about" },
    { name: "Update Log", icon: RefreshCw, path: "/update" },
    { name: "Log Out", icon: LogOut, path: "/logout" },
  ];

  useEffect(() => {
    hoverSoundRef.current = new Audio(HoverSound);
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.3;
    }
  }, []);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-30 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl px-6 py-3">
        <div
          className="text-xl font-extrabold tracking-wider text-white mr-6 cursor-pointer hover:text-blue-400 transition"
          onClick={() => handleNavigate("/")}
        >
        </div>
        <div className="flex space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onMouseEnter={playHoverSound}
                onClick={() => handleNavigate(item.path)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:bg-blue-600 hover:scale-105"
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40 flex items-center justify-between bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg px-4 py-2 w-[90%]">
        <div
          className="text-lg font-bold text-white cursor-pointer hover:text-blue-400 transition"
          onClick={() => handleNavigate("/")}
        >
          CHESS
        </div>
        <button
          className="text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-16 left-1/2 transform -translate-x-1/2 z-30 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg p-4 w-[85%] flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onMouseEnter={playHoverSound}
                onClick={() => handleNavigate(item.path)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-white font-medium text-sm transition hover:bg-blue-600 hover:scale-105"
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
