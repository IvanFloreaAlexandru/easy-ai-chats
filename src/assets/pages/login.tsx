import { useState } from "react";
import Background from "../constants/background/background.tsx";
import Navbar from "../components/NavbarNoLogin.tsx";
import ChessSlider from "../components/ChessSlider";
import LoginPopup from "../components/LoginPopup.tsx";

const LoginPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="login-content relative min-h-screen">
      <div className={`transition-all duration-500 ${isLoginOpen ? 'lg:transform lg:-translate-x-1/4' : ''}`}>
        <ChessSlider 
          Background={Background}
          Navbar={Navbar}
          isLoginOpen={isLoginOpen}
        />
      </div>
      
      {/* Login Button - Hidden when modal is open */}
      {!isLoginOpen && (
        <button 
          onClick={() => setIsLoginOpen(true)}
          className="fixed top-6 right-6 z-30 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/25 transform hover:scale-105"
        >
          Login
        </button>
      )}
      
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
};

export default LoginPage;