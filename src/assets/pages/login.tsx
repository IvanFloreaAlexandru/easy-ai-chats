import { useState } from "react";
import Background from "../constants/background/background.tsx";
import Navbar from "../components/NavbarNoLogin.tsx";
import ChessSlider from "../components/ChessSlider";
import LoginPopup from "../components/LoginPopup.tsx";

const LoginPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="login-content">
      <ChessSlider 
        Background={Background}
        Navbar={Navbar}
        isLoginOpen={isLoginOpen}
      />
      
      {/* Login Button */}
      <button 
        onClick={() => setIsLoginOpen(true)}
        className="fixed top-6 right-6 z-30 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg"
      >
        Login
      </button>
      
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
};

export default LoginPage;