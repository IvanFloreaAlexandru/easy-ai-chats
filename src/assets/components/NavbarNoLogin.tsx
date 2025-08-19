import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Mail, Star, FileText, LogIn, Menu, X } from "lucide-react";
import LoginPopup from "./LoginPopup";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isOpen, setIsOpen] = useState(false); // pentru mobile menu
  const [showLogin, setShowLogin] = useState(false); // pentru LoginPopup

  const navItems = [
    { name: "About", icon: Info, href: "/about" },
    { name: "Contact", icon: Mail, href: "/contact" },
    { name: "Updates", icon: FileText, href: "/update" },
    { name: "Premium", icon: Star, href: "/premium" },
  ];

  const handleClick = (item: { name: string; href: string }) => {
    setActiveItem(item.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const found = navItems.find((i) => i.href === currentPath);
    if (found) setActiveItem(found.name);
  }, [window.location.pathname]);

  return (
    <>
      {/* Mobile Header: Logo + Hamburger */}
      <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 sm:hidden">
        {/* Logo */}
        <Link to="" className="flex items-center gap-2 text-white font-bold text-lg">
          <Home className="w-6 h-6" />
          MyLogo
        </Link>

        {/* Hamburger */}
        <button
          className="p-2 bg-gray-900 rounded-full shadow-xl transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-4 z-40 sm:hidden flex flex-col gap-2 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } bg-gray-900/95 backdrop-blur-md p-3 rounded-xl shadow-lg`}
      >
        {navItems.map((item) => {
          const isActive = item.name === activeItem;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => handleClick(item)}
              className={`flex items-center p-3 rounded-xl text-white font-medium text-base transition-all duration-300 transform ${
                isActive
                  ? "bg-blue-600 scale-105 shadow-md"
                  : "hover:bg-blue-600 hover:scale-105"
              }`}
            >
              <IconComponent className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          );
        })}

        {/* Login Button Mobile */}
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          <LogIn className="w-5 h-5" /> Login
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden sm:flex fixed top-4 left-4 right-0 z-30 bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl py-3 px-4 items-center">
        {/* Logo */}
        <Link to="" className="flex items-center gap-3 text-white font-bold text-lg md:text-xl lg:text-2xl">
          CHESS
        </Link>

        {/* Nav items centrate */}
        <div className="flex-1 flex justify-center space-x-20">
          {navItems.map((item) => {
            const isActive = item.name === activeItem;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleClick(item)}
                className={`flex items-center px-3 py-2 rounded-xl text-white font-medium text-base transition-all duration-300 transform ${
                  isActive
                    ? "bg-blue-600 scale-105 shadow-md"
                    : "hover:bg-blue-600 hover:scale-105"
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Login Button Desktop */}
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-black text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition border-2 border-blue-500 text-base"
        >
          <LogIn className="w-5 h-5" /> Login
        </button>
      </nav>

      {/* Login Popup */}
      <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
