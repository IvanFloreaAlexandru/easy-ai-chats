import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Phone, BookOpen, RefreshCw, LogOut, Menu, X } from "lucide-react";
import HoverSound from "../sounds/selectSound.mp3";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  const navItems = [
    { name: "Learn", icon: BookOpen, path: "/tutorial" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "About us", icon: Home, path: "/about" },
    { name: "Update Log", icon: RefreshCw, path: "/update" },
  ];

  const profileItems = [
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Log Out", icon: LogOut, path: "/logout" },
  ];

  useEffect(() => {
    hoverSoundRef.current = new Audio(HoverSound);
    if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.3;
  }, []);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  const handleNavigate = (path: string) => {
    setActivePath(path);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-30 w-[90%] justify-between items-center bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg px-6 py-3">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold text-white cursor-pointer hover:text-blue-400 transition"
          onClick={() => handleNavigate("/")}
        >
          CHESS
        </div>

        {/* Nav Items */}
        <div className="flex space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <button
                key={item.name}
                onMouseEnter={playHoverSound}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all transform hover:scale-105
                  ${isActive ? "bg-blue-600/40 shadow-lg" : "hover:bg-blue-500/20"}
                `}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Profile */}
        <div className="relative">
          <img
            src="/avatar.png"
            alt="Player Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          />
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-xl shadow-lg py-2 flex flex-col z-50">
              {profileItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onMouseEnter={playHoverSound}
                    onClick={() => handleNavigate(item.path)}
                    className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-blue-500/30 transition-all rounded-lg"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40 flex items-center justify-between w-[90%] bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg px-4 py-2">
        {/* Logo */}
        <div
          className="text-lg font-bold text-white cursor-pointer hover:text-blue-400 transition"
          onClick={() => handleNavigate("/")}
        >
          CHESS
        </div>

        <div className="flex items-center gap-2">
          {/* Profile Mobile */}
          <div className="relative">
            <img
              src="/avatar.png"
              alt="Player Avatar"
              className="w-8 h-8 rounded-full border-2 border-blue-400 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-xl shadow-lg py-2 flex flex-col z-50">
                {profileItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onMouseEnter={playHoverSound}
                      onClick={() => handleNavigate(item.path)}
                      className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-blue-500/30 transition-all rounded-lg"
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-16 left-1/2 transform -translate-x-1/2 z-30 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg p-4 w-[85%] flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <button
                key={item.name}
                onMouseEnter={playHoverSound}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white font-medium text-sm transition hover:bg-blue-500/20 hover:scale-105
                  ${isActive ? "bg-blue-600/30 shadow" : ""}
                `}
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
